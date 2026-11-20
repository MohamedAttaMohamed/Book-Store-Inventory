/**
 * In-process typed event bus.
 *
 * Rules (from the build guide):
 *  - Core transactions never wait on subscribers.
 *  - Subscriber failures are logged but never propagate to the emitter.
 *  - Only the events listed here are allowed; add new ones by extending the map.
 */
import { logger } from './logger.js';

export interface DomainEvents {
  'invoice.completed': { invoiceId: string; total: number };
  'return.completed': { returnId: string; invoiceId: string };
  'stock.low': { productId: string; currentStock: number; reorderPoint: number };
  'backup.completed': { path: string; timestamp: Date };
}

type EventName = keyof DomainEvents;
type Handler<E extends EventName> = (payload: DomainEvents[E]) => void | Promise<void>;

class EventBus {
  private readonly handlers = new Map<EventName, Set<Handler<EventName>>>();

  on<E extends EventName>(event: E, handler: Handler<E>): void {
    if (!this.handlers.has(event)) {
      this.handlers.set(event, new Set());
    }
    // Safe cast: the Set is typed per-event at call site
    (this.handlers.get(event) as Set<Handler<E>>).add(handler);
  }

  off<E extends EventName>(event: E, handler: Handler<E>): void {
    (this.handlers.get(event) as Set<Handler<E>> | undefined)?.delete(handler);
  }

  emit<E extends EventName>(event: E, payload: DomainEvents[E]): void {
    const set = this.handlers.get(event);
    if (!set) return;
    for (const handler of set) {
      // Fire-and-forget; swallow subscriber errors
      void Promise.resolve()
        .then(() => (handler as Handler<E>)(payload))
        .catch((err: unknown) => {
          logger.error({ err, event }, 'Event handler error (non-fatal)');
        });
    }
  }
}

export const eventBus = new EventBus();
