import { useExecuteProgram } from '@puzzlehq/sdk';
import { useState } from 'react';

function Mint() {
  const [recipient, setRecipient] = useState<string | undefined>();
  const [amount, setAmount] = useState<string | undefined>();

  const {
    execute,
    loading: execute_loading,
    transactionId,
  } = useExecuteProgram({
    programId: 'zksummit_token_v10.aleo',
    functionName: 'mint_private',
    inputs: [recipient ?? '', amount + 'u64'],
  });

  return (
    <div className='w-full border rounded-lg flex flex-col items-center justify-center gap-4 p-4'>
      <span className='text-xl font-bold'>Mint</span>
      <div className='w-[80%]'>
        <label htmlFor="recipient" className="block text-sm font-medium leading-6">
          Recipient
        </label>
        <div className="mt-2">
          <input
            name="recipient"
            id="recipient"
            className="block w-full rounded-md border-0 p-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="aleo168l7zt7686ns54qmweda5ngs28c9jr6rdehlezdcv6ssr899m5qq4f4qgy"
            onChange={(e: any) => {setRecipient(e.target.value)}}
          />
        </div>
      </div>
      <div className='w-[80%]'>
        <label htmlFor="amount" className="block text-sm font-medium leading-6">
          Amount
        </label>
        <div className="mt-2">
          <input
            name="amount"
            id="amount"
            className="block w-full rounded-md border-0 p-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="10"
            onChange={(e: any) => {setAmount(e.target.value)}}
          />
        </div>
      </div>
      <button 
        disabled={execute_loading || !amount || !recipient}
        onClick={execute}
      >
        mint
      </button>
      {transactionId && <a target='_blank' href={`https://vm.aleo.org/api/testnet3/transaction/${transactionId}`}>View your transaction</a>}
    </div>
  );
}

export default Mint;