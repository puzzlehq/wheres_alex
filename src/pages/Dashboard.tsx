import { Record, useAccount, useConnect, useExecuteProgram, useRecords } from '@puzzlehq/sdk';
import { useEffect, useState } from 'react';
import Mint from '../Mint.js';

export const shortenAddress = (
  address: string,
) => {
  const length = 5;
  if (address.length < length * 2) return address;
  return `${address.slice(
    0,
    10
  )}...${address.slice(address.length - length, address.length)}`;
};

function Dashboard() {
  const { account } = useAccount();
  const { loading } = useConnect();
  const { records, request } = useRecords({
    filter: { program_id: 'zksummit_token_v10.aleo', type: 'unspent' }
  });
  const [totalBalance, setTotalBalance] = useState(0);
  const [maxSpendable, setMaxSpendable] = useState(0);

  const [recipient, setRecipient] = useState<string | undefined>();
  const [amount, setAmount] = useState<string | undefined>();
  const [record, setRecord] = useState<Record | undefined>();
  const [isReadyToExecute, setIsReadyToExecute] = useState(false);

  const {
    execute,
    loading: execute_loading,
    transactionId,
  } = useExecuteProgram({
    programId: 'zksummit_token_v10.aleo',
    functionName: 'transfer_private',
    inputs: [record ?? '', recipient ?? '', amount + 'u64']
  });

  useEffect(() => {
    request();
  }, []);

  useEffect(() => {
    if (records) {
      // console.log('records', records);
      let total = 0;
      let max = 0;
      records.forEach(r => {
        const credits = Number(r.plaintext.split('amount:')[1]?.split('u64')[0]) ?? 0;
        total += credits;
        max = Math.max(credits, max);
      });
      setTotalBalance(total);
      setMaxSpendable(max);
    }
  }, [records]);

  useEffect(() => {
    if (isReadyToExecute) {
      execute();
      setIsReadyToExecute(false);
    }
  }, [isReadyToExecute]);

  // if (!isConnected) {
  //   throw new Error('dashboard shouldn\'t be showing rn');
  // }

  if (loading) {
    return <>loading...</>
  }

  const onRecipientChange = (e: any) => {
    setRecipient(e.target.value);
  }

  const onAmountChange = (e: any) => {
    setAmount(e.target.value);
  };

  const send = () => {
    if (!records) {
      console.log('send called with no records');
      return;
    }
    const recordToSpendIndex = records.findIndex(r => {
      const credits = Number(r.plaintext.split('amount:')[1].split('u64')[0]);
      if (credits > Number(amount!)) {
        console.log('setting record', r);
        return r;
      }
    });
    if (recordToSpendIndex < 0) {
      console.log('could not find record to spend');
      return;
    }
    const recordToSpend = records[recordToSpendIndex];
    console.log(`sending ${amount} to ${recipient} with ${recordToSpend}`);
    setRecord(recordToSpend);
    setIsReadyToExecute(true);
  };

  console.log(account);
  if (!account) {
    return <p>loading account info...</p>
  }

  return (
    <div className='flex flex-col w-full h-full gap-2 items-center'>
      <div className='w-3/4 lg:w-1/2 flex flex-col items-center justify-center gap-10 pb-4'>
        <div className='w-full border rounded-lg flex flex-col p-4'>
          <div className='w-full flex justify-between'>
            <span className='font-bold'>Total Balance</span>
            <span>{(totalBalance || 0).toFixed(2) ?? 0}</span>
          </div>
          <div className='w-full flex justify-between'>
            <span className='font-bold'>Largest Record to Spend</span>
            <span>{(maxSpendable || 0).toFixed(2) ?? 0}</span>
          </div>
        </div>
        <div className='w-full border rounded-lg flex flex-col items-center justify-center gap-4 p-4'>
          <span className='text-xl font-bold'>Transfer</span>
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
                onChange={onRecipientChange}
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
                onChange={onAmountChange}
              />
            </div>
          </div>
          <button disabled={execute_loading || !amount || !recipient} onClick={send}>send</button>
          {transactionId && <a target='_blank' href={`https://vm.aleo.org/api/testnet3/transaction/${transactionId}`}>View your transaction</a>}
        </div>
        {account?.address === account.address && (  
          <Mint />
        )}
      </div>
    </div>
  );
}

export default Dashboard;