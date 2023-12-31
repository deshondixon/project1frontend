import React, { useEffect } from 'react';
import { Table, Spacer, Text, Container } from '@nextui-org/react';
import axios from 'axios';

export default function Pending() {
  const [pendingReimbursements, setPendingReimbursements] = React.useState([]);

  const columns2 = [
    {
      key: 'id',
      label: 'Ticket Number',
    },
    {
      key: 'description',
      label: 'Description',
    },
    {
      key: 'expenseAmount',
      label: 'Amount',
    },
    {
      key: 'status',
      label: 'Status',
    },
  ];

  const fetchPendingTickets = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      const response = await axios.get('http://localhost:8080/reimbursements', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = response.data;
      const pending = data.filter(
        (reimbursement) => reimbursement.status.toLowerCase() === 'pending'
      );
      setPendingReimbursements(pending);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPendingTickets();
  }, []);

  return (
    <Container>
      <Text
        h1
        size={30}
        css={{
          textGradient: '45deg, $yellow600 -20%, $red600 100%',
        }}
        weight='bold'
      >
        Pending Reimbursements
      </Text>
      <Spacer y={1} />
      <Table
        aria-label='Pending Reimbursements Table'
        css={{
          height: 'auto',
          minWidth: '100%',
        }}
      >
        <Table.Header columns={columns2}>
          {(column) => (
            <Table.Column key={column.key}>{column.label}</Table.Column>
          )}
        </Table.Header>
        <Table.Body items={pendingReimbursements}>
          {(item) => (
            <Table.Row key={item.id}>
              <Table.Cell>{item.id}</Table.Cell>
              <Table.Cell>{item.description}</Table.Cell>
              <Table.Cell>{item.expenseAmount}</Table.Cell>
              <Table.Cell>
                <Text color='#ff0000'>{item.status}</Text>
              </Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>
    </Container>
  );
}
