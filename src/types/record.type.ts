export default interface IRecord {
  id: number;
  amount: number;
  user_balance: number;
  operation_response: string;
  operation_id: number;
  created_at: Date;
  updated_at: Date;
}
