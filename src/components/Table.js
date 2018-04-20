import React from 'react';

import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import classes from './Table.css';
import data from './../dane.json';

class Table extends React.Component {
  constructor(props) {
    super(props);

    this.options = {
      defaultSortName: 'id',  // default sort column name
      defaultSortOrder: 'asc',  // default sort order
      page: 1,  // which page you want to show as default
      sizePerPage: 5,  // which size per page you want to locate as default
      pageStartIndex: 1, // where to start counting the pages
      prePage: '< back', // Previous page button text
      nextPage: 'next >', // Next page button text
      paginationSize: 3,  // the pagination bar size.
      paginationShowsTotal: this.renderShowsTotal,  // Accept bool or function
      hideSizePerPage: true,
      // hideSizePerPage: true > You can hide the dropdown for sizePerPage
      // alwaysShowAllBtns: true // Always show next and previous button
      // withFirstAndLast: false > Hide the going to First and Last page button
    };
  }

  componentWillMount() {
    var months = ["styczeń", "luty", "marzec", "kwiecień", "maj", "czerwiec", "lipiec", "sierpień", "wrzesień", "październik", "listopad", "grudzień"];

    changeBirthDate();
    function changeBirthDate () {
      for (var i=0; i< data.length; i++)
      {
        let splitBirthDate = data[i].dateOfBirth.split(".");
        let monthNumber;

        changeMonth();
        function changeMonth () {
          if (splitBirthDate[1].charAt(0) == 0)
          {
            monthNumber = splitBirthDate[1].slice(0,1)
          }
          else monthNumber = splitBirthDate[1];};
          let monthName = months[monthNumber];
          let year = splitBirthDate[2].split(" ").shift();
          data[i].dateOfBirth = splitBirthDate[0] + " " + monthName + " " + year;
        }
      }

    }

    render() {
      return (
        <div>
        <div className="table-container">
        <BootstrapTable data={ data } options={ this.options } pagination={true}>
        <TableHeaderColumn dataField='id' width='60' dataAlign="center" isKey dataSort>iD</TableHeaderColumn>
        <TableHeaderColumn dataField='firstName' width='140' dataAlign="center" dataSort>First Name</TableHeaderColumn>
        <TableHeaderColumn dataField='lastName' width='140' dataAlign="center" dataSort>Last Name</TableHeaderColumn>
        <TableHeaderColumn dataField='dateOfBirth' width='190' dataAlign="center" dataSort>Birth Date</TableHeaderColumn>
        <TableHeaderColumn dataField='company' width='135' dataAlign="center" dataSort>Company</TableHeaderColumn>
        <TableHeaderColumn dataField='note' width='135' dataAlign="center" dataSort>Note</TableHeaderColumn>
        </BootstrapTable>
        </div>
        </div>
      );
    }
  }

  export default Table;
