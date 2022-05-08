import {
  Arg,
  Field,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  Subscription,
} from "type-graphql"
import { pubSub } from "../pubsub"
import { Board, Game, Player, Square, Status } from "./game"

const game = new Game()

@ObjectType()
export class TicTacToe {
  @Field(() => [[Square]])
  board: Board

  @Field(() => Player)
  turn: Player

  @Field(() => Status)
  status: Status
}

@Resolver()
export class TicTacToeResolver {
  @Query(() => TicTacToe)
  state() {
    return game.state
  }

  @Mutation(() => TicTacToe)
  move(
    @Arg("player") player: Player,
    @Arg("row") row: number,
    @Arg("col") col: number,
  ) {
    game.move(player, row, col)
    pubSub.publish("STATE_CHANGED", null)
    return game.state
  }

  @Mutation(() => TicTacToe)
  newGame(@Arg("start") player: Player) {
    game.newGame(player)
    pubSub.publish("STATE_CHANGED", null)
    return game.state
  }

  @Subscription(() => TicTacToe, {
    async *subscribe() {
      yield
      yield* pubSub.asyncIterable("STATE_CHANGED")
    },
  })
  gameState() {
    return game.state
  }
}
