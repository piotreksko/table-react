import React, { Component } from "react";

import { v4 } from "uuid";
import classes from "./Table.scss";
import data from "./../../dane.json";
import Pagination from "../Pagination/Pagination";


const months = [
  "styczeń",
  "luty",
  "marzec",
  "kwiecień",
  "maj",
  "czerwiec",
  "lipiec",
  "sierpień",
  "wrzesień",
  "październik",
  "listopad",
  "grudzień"
];
convertBirthDate();
changeHeadingsNames();

// Convert JSON birt date
function convertBirthDate() {
  for (var i = 0; i < data.length; i++) {
    let splitBirthDate = data[i].dateOfBirth.split(".");
    let monthNumber;

    changeMonth();
    function changeMonth() {
      if (splitBirthDate[1].charAt(0) == 0) {
        monthNumber = splitBirthDate[1].slice(0, 1);
      } else monthNumber = splitBirthDate[1];
    }
    let monthName = months[monthNumber];
    let year = splitBirthDate[2].split(" ").shift();
    data[i].dateOfBirth = splitBirthDate[0] + " " + monthName + " " + year;
  }
}

// Change headings names
function changeHeadingsNames() {
  for (var i = 0; i < data.length; i++) {
    data[i]["iD"] = data[i]["id"];
    data[i]["First Name"] = data[i]["firstName"];
    data[i]["Last Name"] = data[i]["lastName"];
    data[i]["Birth Date"] = data[i]["dateOfBirth"];
    data[i]["Company"] = data[i]["company"];
    data[i]["Note"] = data[i]["note"];
    delete data[i]["id"];
    delete data[i]["firstName"];
    delete data[i]["lastName"];
    delete data[i]["dateOfBirth"];
    delete data[i]["company"];
    delete data[i]["note"];
    console.log(data[i]);
  }
}

class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.data.slice(),
      headings: Object.keys(props.data[0]),
      itemsPerPage: 5,
      currentPage: 1,
      sortOrder: props.sortOrder || "original",
      sortKey: props.sortKey || null,
      dataToDisplay: props.data.slice()
    };

    this.sortHandler = this.sortHandler.bind(this);
    this.onChangePage = this.onChangePage.bind(this);
  }

  componentWillMount() {
    //TODO: only apply this to the root element of the table component
    document.addEventListener("dragover", event => {
      event.preventDefault();
    });
  }

  sortHandler(e) {
    const sortKey = e.target.dataset.sortcolumn;
    const currentSortKey = this.state.sortKey;
    const currentSortOrder =
      sortKey === currentSortKey ? this.state.sortOrder : "original";
    let sortOrder;
    let dataToDisplay = this.state.data.slice();

    switch (currentSortOrder) {
      case "original":
        sortOrder = "ascending";
        dataToDisplay.sort((a, b) => {
          if (a[sortKey] < b[sortKey]) {
            return -1;
          }
          if (a[sortKey] > b[sortKey]) {
            return 1;
          }
          return 0;
        });
        break;
      case "ascending":
        sortOrder = "descending";
        dataToDisplay.sort((a, b) => {
          if (a[sortKey] < b[sortKey]) {
            return 1;
          }
          if (a[sortKey] > b[sortKey]) {
            return -1;
          }
          return 0;
        });
        break;
      case "descending":
        sortOrder = "original";
        dataToDisplay = this.props.data.slice();
        break;
      default:
        break;
    }
    this.setState({ sortKey, dataToDisplay, sortOrder });
    console.log(`sortKey: ${sortKey};
    sortOrder: ${sortOrder}`);
  }

  onChangePage(nextPage) {
    // Update state with new page of items
    this.setState({ currentPage: nextPage });
  }

  render() {
    let { currentPage, itemsPerPage, dataToDisplay } = this.state;

    let totalPages = Math.ceil(dataToDisplay.length / itemsPerPage);

    return (
      <div
        role="region"
        aria-labelledby={this.props.id}
        tabIndex="0"
        style={{ overflow: "auto" }}
      >
        <table
          cellSpacing="0"
          cellPadding="0"
          data-sortorder={this.state.sortOrder}
        >
          {this.props.caption && (
            <caption id={this.props.id}>{this.props.caption}</caption>
          )}
          <thead>
            <tr>
              {this.state.headings.map((element, index) => {
                return (
                  <th
                    key={v4()}
                    data-sortcolumn={element}
                    id={"header" + index}
                    onClick={this.sortHandler}
                  >
                    {element}<span className="caret"></span><span className="caret upsidedown"></span>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {dataToDisplay
              .slice(
                (currentPage - 1) * itemsPerPage,
                currentPage * itemsPerPage
              )
              .map((element, index) => {
                return (
                  <tr key={v4()} id={"row" + index}>
                    {element &&
                      Object.values(element).map(cell => {
                        return <td key={v4()}>{cell}</td>;
                      })}
                  </tr>
                );
              })}
          </tbody>
        </table>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onChangePage={this.onChangePage}
        />
      </div>
    );
  }
}

export default Table;
