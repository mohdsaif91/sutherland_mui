import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import { makeStyles } from "@mui/styles";

import MaleIcon from "../assests/icon/maleicon.png";
import FemaleIcon from "../assests/icon/femaleicon.png";

const styles = makeStyles({
  tableHeader: {
    backgroundColor: "#1976D2",
  },
  tableHeaderCell: {
    padding: "24px",
    fontSize: "26px",
    color: "#fff !important",
  },
  tableBodyCell: {
    padding: "8px 24px",
    fontSize: "18px",
  },
  searchBar: {
    padding: "16px 8px",
    width: "99%",
  },
  genderIcon: {
    height: "40px",
  },
  profileImage: {
    height: "100px",
  },
});

function HomePage() {
  const [randomUser, setRandomUser] = useState(null);
  const [filterRandomUser, setFilterRandomUser] = useState(null);
  const [filter, setFilter] = useState("");

  const classes = styles();

  const getData = () => {
    fetch("https://dummyjson.com/users")
      .then((res) => res.json())
      .then((res) => {
        console.log(res.users);
        setRandomUser(res.users);
        setFilterRandomUser(res.users);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      console.log(filter);
      if (filter === "") {
        setFilterRandomUser(randomUser);
      } else {
        setFilterRandomUser(
          randomUser.filter((f) => f.firstName.includes(filter))
        );
      }
    }, 1000);
    return () => {
      clearInterval(debounceTimeout);
    };
  }, [filter]);

  useEffect(() => {
    if (!randomUser) {
      getData();
    }
  }, []);

  return (
    <div>
      <div>
        <TextField
          value={filter}
          className={classes.searchBar}
          variant="outlined"
          placeholder="search by Name"
          type="search"
          onInput={(e) => setFilter(e.target.value)}
        />
      </div>
      <div>
        {Array.isArray(filterRandomUser) && (
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead className={classes.tableHeader}>
                <TableRow className={classes.tableHeaderRow}>
                  <TableCell className={classes.tableHeaderCell}>
                    Serial No
                  </TableCell>
                  <TableCell className={classes.tableHeaderCell} align="left">
                    Name
                  </TableCell>
                  <TableCell className={classes.tableHeaderCell} align="left">
                    Profile image
                  </TableCell>
                  <TableCell className={classes.tableHeaderCell} align="left">
                    Email
                  </TableCell>
                  <TableCell className={classes.tableHeaderCell} align="left">
                    Gender
                  </TableCell>
                  <TableCell className={classes.tableHeaderCell} align="left">
                    University
                  </TableCell>
                  <TableCell className={classes.tableHeaderCell} align="left">
                    Age
                  </TableCell>
                  <TableCell className={classes.tableHeaderCell} align="left">
                    Eye color
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filterRandomUser.map((m, index) => (
                  <TableRow
                    className={classes.tableBodyCell}
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell
                      className={classes.tableBodyCell}
                      component="th"
                      scope="row"
                    >
                      {m.id}
                    </TableCell>
                    <TableCell className={classes.tableBodyCell} align="left">
                      {`${m.firstName} ${m.lastName}`}
                    </TableCell>
                    <TableCell className={classes.tableBodyCell} align="left">
                      <img
                        className={classes.profileImage}
                        src={m.image}
                        alt=""
                      />
                    </TableCell>
                    <TableCell className={classes.tableBodyCell} align="left">
                      {m.email}
                    </TableCell>
                    <TableCell className={classes.tableBodyCell} align="left">
                      <img
                        className={classes.genderIcon}
                        src={m.gender === "male" ? MaleIcon : FemaleIcon}
                        alt=""
                      />
                    </TableCell>
                    <TableCell className={classes.tableBodyCell} align="left">
                      {m.university}
                    </TableCell>
                    <TableCell className={classes.tableBodyCell} align="left">
                      {m.age}
                    </TableCell>
                    <TableCell className={classes.tableBodyCell} align="left">
                      {m.eyeColor}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </div>
    </div>
  );
}

export default HomePage;
