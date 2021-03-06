import React, {Component} from 'react';
import UICard from '../../components/UI/UICard';
import Table from '../../components/Table';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import {sortTable} from '../../helpers/Helper';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import 'react-tabs/style/react-tabs.css';
import PerksService from '../../services/perks';
import { getPerksRequest } from '../../redux/actions/index'

const perksService = new PerksService();

class Perks extends Component {
    state = {
        headers: [
            {asc: '', title: "Title", sortable: true, sortKey: "perk"},
            {asc: '', title: "Required Referrals", sortable: true, sortKey: "count"},
            {asc: '', title: "", sortable: false, sortKey: "buttons"},
        ],

        rows: []
    }

    async componentDidMount(){
        let data = await perksService.getPerks();
        this.props.dispatch(getPerksRequest(data));
    }

    onSort = (sortKey) => {
        let {rows, headers} = this.state;
        let result = sortTable.sort_table(headers, rows, sortKey);
        this.setState({headers: result.headers, rows: result.rows});
    }

    render(){
        const {perks} = this.props;
        let rows = perks ? perks.map(item => ({
            perk: item.title,
            count: item.required_referrals,
            buttons: <div><Link to={`/perk/viewPerk/${item.id}`}>View</Link><Link to={`/perk/editPerk/${item.id}`}>Edit</Link></div>
        })) : {};
        let {headers} = this.state;
        return(
            <div className="perk-container">
            <Tabs>
                <TabList>
                    <Tab>Customer Rewards</Tab> 
                    <Tab>Friends’ rewards</Tab>
                </TabList>
                <TabPanel>
                    <div className="switch-button">
                        <Link className="btn" to="/perk/addPerkCustomer">New Perk for Customer Rewards</Link>
                    </div>
                    <UICard className="x" title="Visible" mid={true} half={false}>
                        <Table className="headers" headers={headers} rows={rows} onSort={(sortKey) => this.onSort(sortKey)}/>
                    </UICard>
                    <UICard title="Hidden" mid={true} half={false}>
                        <Table headers={headers} rows={[]} onSort={(sortKey) => this.onSort(sortKey)}/>
                    </UICard>
                </TabPanel>
                <TabPanel>
                    <div className="switch-button">
                        <Link className="btn" to="/perk/addPerkCustomer">New Perk for Friends' Rewards</Link>
                    </div>
                    <UICard title="Visible" mid={true} half={false}>
                        <Table className="headers" headers={headers} rows={rows} onSort={(sortKey) => this.onSort(sortKey)}/>
                    </UICard>
                </TabPanel>
            </Tabs>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    perks: state.perks
})

export default connect(mapStateToProps)(Perks);