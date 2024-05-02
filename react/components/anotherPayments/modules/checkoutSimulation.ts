import { post } from './fetch'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const checkoutSimulation = async (data: any): Promise<any> => {
  return post('/api/checkout/pub/orderForms/simulation', data)
}
