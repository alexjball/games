import { PubSub as Base } from "graphql-subscriptions"

class PubSub extends Base {
  asyncIterable(topic: string) {
    return {
      [Symbol.asyncIterator]: () => this.asyncIterator(topic),
    }
  }
}

export const pubSub = new PubSub()
