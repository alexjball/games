import {
  Arg,
  Field,
  Mutation,
  ObjectType,
  PubSub,
  PubSubEngine,
  Query,
  Resolver,
  Subscription,
} from "type-graphql"
import { Board, Game, Player, Square, Status } from "./game"

const game = new Game()

@ObjectType()
export class TicTacToe {
  @Field(type => [[Square]])
  board: Board

  @Field(type => Player)
  turn: Player

  @Field(type => Status)
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
    @PubSub() pubSub: PubSubEngine,
  ) {
    game.move(player, row, col)
    pubSub.publish("STATE_CHANGED", null)
    return game.state
  }

  @Mutation(() => TicTacToe)
  newGame(@Arg("start") player: Player, @PubSub() pubSub: PubSubEngine) {
    game.newGame(player)
    pubSub.publish("STATE_CHANGED", null)
    return game.state
  }

  @Subscription(() => TicTacToe, { topics: "STATE_CHANGED" })
  gameState() {
    return game.state
  }
}
