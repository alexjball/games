import { QueryClient, QueryClientProvider as Base } from "react-query"
import { GraphQLClientProvider } from "./sdk/client"
import { BaseProvider, createProviders } from "./service"

const queryClient = new QueryClient()

const QueryClientProvider: BaseProvider = ({ children }) => (
  <Base client={queryClient}>{children}</Base>
)

export const Providers = createProviders([
  QueryClientProvider,
  GraphQLClientProvider,
])
