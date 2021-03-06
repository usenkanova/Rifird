import React, {Component} from 'react';
import UICard from '../../components/UI/UICard';
import Table from '../../components/Table';
import {sortTable} from '../../helpers/Helper';
import CustomersService from '../../services/customers';

const customersService = new CustomersService();

class Customers extends Component {
    state = {
        headers: [
            {asc: '', title: "Phone Number", sortable: true, sortKey: "phone_number"},
            {asc: '', title: "Email", sortable: true, sortKey: "email"},
            {asc: '', title: "Name", sortable: true, sortKey: "name"},
            {asc: '', title: "Referral", sortable: false, sortKey: "referral"},
        ],

        rows: []
    }

  async componentDidMount() {
    let data = await customersService.getCustomers();
    this.setState({
        rows: data.customers.map(item => ({
                phone_number: item.phone_number,
                email: item.email,
                name: item.name,
                referral: item.num_referred
        }))
    });
    }

    onSort = (sortKey) => {
        let {rows, headers} = this.state;
        let result = sortTable.sort_table(headers, rows, sortKey);
        this.setState({headers: result.headers, rows: result.rows});
    }

    render(){ 
        let {headers, rows} = this.state;
        return(
                <UICard title="Customers" half={false}>
                    <Table headers={headers} rows={rows} onSort={(sortKey) => this.onSort(sortKey)}/>
                </UICard>
        );
    }
}

export default Customers;