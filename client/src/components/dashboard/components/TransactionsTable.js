import React from "react";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const TransactionsTable = ({ transactionsData }) => {
    const transactionsColumns = ["Account", "Date", "Name", "Amount", "Category"];

    const createData = (account, date, name, amount, category) => {
        return { account, date, name, amount, category };
    }

    const transactionRows = transactionsData.map(data => {
        return createData(data.account, data.date, data.name, data.amount, data.category)
    })

    return (
        <TableContainer component={Paper}>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        {transactionsColumns.map(cols => (<TableCell align="right">{cols}</TableCell>))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {transactionRows.map(row => (
                        <TableRow key={row.account}>
                            <TableCell component="th" scope="row">
                                {row.account}
                            </TableCell>
                            <TableCell align="right">{`$${row.amount}`}</TableCell>
                            <TableCell align="right">{row.name}</TableCell>
                            <TableCell align="right">{row.date}</TableCell>
                            <TableCell align="right">{row.category}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default TransactionsTable;