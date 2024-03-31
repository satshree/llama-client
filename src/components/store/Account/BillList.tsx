import { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Text,
  Heading,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
  VStack,
} from "@chakra-ui/react";

import { BillType, PaidType } from "@/types";
import { roundDecimal } from "@/utils";

interface BillListProps {
  billList: BillType[];
  openModal: (bill: BillType) => void;
}

function BillList(props: BillListProps) {
  const [billList, setBillList] = useState<BillType[]>([]);

  useEffect(() => setBillList(props.billList), [props.billList]);

  const getTotalPaid = (paid: PaidType[]) => {
    let total = 0;
    for (let p of paid) {
      total += p.amount;
    }
    return total;
  };

  const getTotalItems = (bill: BillType) => {
    let quantity = 0;

    for (let o of bill.orders) {
      quantity += o.quantity;
    }

    return quantity;
  };

  return (
    <>
      <VStack spacing="0.5rem">
        {billList.map((bill) => (
          <>
            <Box
              key={bill.id}
              w="100%"
              p="1rem"
              cursor="pointer"
              onClick={() => props.openModal(bill)}
              borderWidth={0.8}
              borderRadius={8}
            >
              <Flex alignItems="center" justifyContent="space-between">
                <div>
                  <Heading size="sm">
                    {bill.date ? (
                      <>Billed at {bill.date}</>
                    ) : (
                      <>Billed date unavailable</>
                    )}
                  </Heading>
                  <Text fontSize="sm">Total {getTotalItems(bill)} items</Text>
                </div>
                <div>
                  <Stat>
                    <StatLabel>Total</StatLabel>
                    <StatNumber>${roundDecimal(bill.grand_total)}</StatNumber>
                    <StatHelpText>
                      {bill.paid.length > 0 ? (
                        <>Paid ${getTotalPaid(bill.paid)}</>
                      ) : (
                        <>Not Paid</>
                      )}
                    </StatHelpText>
                  </Stat>
                </div>
              </Flex>
            </Box>
          </>
        ))}
      </VStack>
    </>
  );
}

export default BillList;
