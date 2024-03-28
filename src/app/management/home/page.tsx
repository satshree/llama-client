"use client";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Card,
  CardBody,
  Center,
  Divider,
  Heading,
  SimpleGrid,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
  Text,
  useToast,
} from "@chakra-ui/react";

import { GlobalState, IAnalytics } from "@/types";
import { API_ROOT } from "@/utils";
import moment from "moment";

const dummyAnalytics: IAnalytics = {
  totalSales: 0,
  totalCashFlow: 0,
  totalProducts: 0,
  totalUsers: {
    total: 0,
    adminUser: 0,
  },
};

function Management() {
  const toast = useToast();
  const { access } = useSelector((state: GlobalState) => state.auth.token);
  const { user } = useSelector((state: GlobalState) => state.auth);

  const [analytics, setAnalytics] = useState<IAnalytics>(dummyAnalytics);

  const getAnalytics = () => {
    fetch(API_ROOT + "/api/management/analytics/", {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    })
      .then(async (resp) => {
        const response = await resp.json();
        if (resp.status !== 200) {
          console.log(resp);
          console.log(response);
          toast({
            title: "Something went wrong",
            description: "Unable to fetch analytics",
            status: "warning",
            isClosable: true,
            position: "top-right",
          });
        } else {
          setAnalytics(response);
        }
      })
      .catch((err) => {
        console.log(err);
        toast({
          title: "Something went wrong",
          description: "Unable to fetch analytics",
          status: "error",
          isClosable: true,
          position: "top-right",
        });
      });
  };

  useEffect(() => getAnalytics(), []);

  return (
    <>
      <Heading>Welcome Back, {user.username}</Heading>
      <br />
      <Heading size="sm">{moment().format("MMMM Do YYYY, h:mm a")}</Heading>
      <br />
      <Divider />
      <br />
      <Center>
        <Text>This is how things are looking</Text>
      </Center>
      <br />
      <SimpleGrid columns={2} spacing={10}>
        <Card>
          <CardBody>
            <Stat>
              <StatLabel>Total Cashflow</StatLabel>
              <StatNumber>${analytics.totalCashFlow}</StatNumber>
            </Stat>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <Stat>
              <StatLabel>Total Sales</StatLabel>
              <StatNumber>{analytics.totalSales}</StatNumber>
            </Stat>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <Stat>
              <StatLabel>Total Products</StatLabel>
              <StatNumber>{analytics.totalProducts}</StatNumber>
            </Stat>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <Stat>
              <StatLabel>Total Users</StatLabel>
              <StatNumber>{analytics.totalUsers.total}</StatNumber>
              <StatHelpText>
                Total {analytics.totalUsers.adminUser} admin user
              </StatHelpText>
            </Stat>
          </CardBody>
        </Card>
      </SimpleGrid>
    </>
  );
}

export default Management;
