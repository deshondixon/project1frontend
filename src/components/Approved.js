import React, { useEffect } from 'react';
import { Table, Spacer, Text, Container } from '@nextui-org/react';
import axios from 'axios';

export default function Approved() {
  const [approvedReimbursements, setApprovedReimbursements] = React.useState(
    []
  );

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

  const fetchApprovedTickets = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      const response = await axios.get('http://localhost:8080/reimbursements', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = response.data;
      const approved = data.filter(
        (reimbursement) => reimbursement.status.toLowerCase() === 'approved'
      );
      setApprovedReimbursements(approved);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchApprovedTickets();
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
        Approved Reimbursements
      </Text>
      <Spacer y={1} />
      <Table
        aria-label='Approved Reimbursements Table'
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
        <Table.Body items={approvedReimbursements}>
          {(item) => (
            <Table.Row key={item.id}>
              <Table.Cell>{item.id}</Table.Cell>
              <Table.Cell>{item.description}</Table.Cell>
              <Table.Cell>{item.expenseAmount}</Table.Cell>
              <Table.Cell>
                <Text color='success'>{item.status}</Text>
              </Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>
    </Container>
  );
}
