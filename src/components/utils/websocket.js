export class ReconnectingWebSocket {
  constructor(url, onMessage, onStatusChange, maxRetries = 5) {
    this.url = url;
    this.onMessage = onMessage;
    this.onStatusChange = onStatusChange;
    this.maxRetries = maxRetries;

    this.retryCount = 0;
    this.ws = null;

    this.shouldReconnect = true;
    this.reconnectTimeout = null;
    this.pingInterval = null;

    this.isConnecting = false;
  }

  // ======================
  // CONNECT
  // ======================
  connect() {
    return new Promise((resolve, reject) => {
      if (this.isConnecting) {
        console.warn("⚠️ WS connect already in progress");
        return;
      }

      try {
        this.isConnecting = true;
        console.log(`🔗 [WS] Connecting → ${this.url}`);

        this.ws = new WebSocket(this.url);

        this.ws.onopen = () => {
          console.log(`✅ [WS] Connected → ${this.url}`);

          this.retryCount = 0;
          this.isConnecting = false;
          this.onStatusChange?.("connected");

          // 🔐 Immediate handshake (Render-safe)
          setTimeout(() => {
            this.send({
              type: "client_ready",
              timestamp: Date.now(),
            });
            console.log("📤 [WS] Handshake sent");
          }, 100);

          this.startPingPong();
          resolve(this.ws);
        };

        this.ws.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data);

            // Server keepalive
            if (data.type === "keepalive") {
              return;
            }

            // Server handshake ack
            if (data.type === "server_ack") {
              console.log("✓ [WS] Handshake acknowledged");
              return;
            }

            // Connection established message
            if (data.type === "connection_established") {
              console.log("✓ [WS] Connection established");
              return;
            }

            this.onMessage?.(event);
          } catch (err) {
            console.error("❌ [WS] Message parse error:", err);
          }
        };

        this.ws.onerror = (error) => {
          console.error(`❌ [WS] Error → ${this.url}`, error);
          this.isConnecting = false;
          reject(error);
        };

        this.ws.onclose = (event) => {
          console.warn(
            `🔌 [WS] Closed → ${this.url}`,
            event.code,
            event.reason
          );

          this.isConnecting = false;
          this.stopPingPong();
          this.onStatusChange?.("disconnected");

          if (this.shouldReconnect && this.retryCount < this.maxRetries) {
            this.scheduleReconnect();
          }
        };
      } catch (error) {
        this.isConnecting = false;
        reject(error);
      }
    });
  }

  // ======================
  // PING / PONG
  // ======================
  startPingPong() {
    this.stopPingPong();

    // Render idle timeout ≈ 60s → ping every 30s
    this.pingInterval = setInterval(() => {
      if (this.ws && this.ws.readyState === WebSocket.OPEN) {
        this.send({ type: "ping", timestamp: Date.now() });
      }
    }, 30000);
  }

  stopPingPong() {
    if (this.pingInterval) {
      clearInterval(this.pingInterval);
      this.pingInterval = null;
    }
  }

  // ======================
  // RECONNECT LOGIC
  // ======================
  scheduleReconnect() {
    if (this.reconnectTimeout) {
      clearTimeout(this.reconnectTimeout);
    }

    const delay = Math.min(1000 * Math.pow(2, this.retryCount), 16000);
    this.retryCount++;

    console.warn(
      `🔄 [WS] Reconnecting in ${delay}ms (${this.retryCount}/${this.maxRetries})`
    );

    this.onStatusChange?.("reconnecting");

    this.reconnectTimeout = setTimeout(() => {
      if (!this.shouldReconnect) return;

      console.log("🔄 [WS] Attempting reconnection...");
      this.connect().catch(() => {
        // onclose will retry again if allowed
      });
    }, delay);
  }

  // ======================
  // SAFE SEND
  // ======================
  send(data) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(data));
      return true;
    }
    return false;
  }

  // ======================
  // CLOSE
  // ======================
  close() {
    console.log("🛑 [WS] Closing connection");
    this.shouldReconnect = false;

    this.stopPingPong();

    if (this.reconnectTimeout) {
      clearTimeout(this.reconnectTimeout);
      this.reconnectTimeout = null;
    }

    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }
}
