import "./Home.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

//import MUI
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const Home = () => {
  const [toysList, setToyList] = useState();
  const [toyDelete, setToyDelete] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/toys");
        // console.log(response.data);
        setToyList(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, [toyDelete]);

  //func for delete
  const handleDelet = async (toyId) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/toys/delete/${toyId}`
      );
      // console.log(response.data);
      if (response.data) {
        setToyDelete(true);
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  return isLoading ? (
    <span>En cours de chargement...</span>
  ) : (
    <div className="toys-container ">
      <h1>Toys</h1>
      <Link to="/addatoy">Ajouter un jouet</Link>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="left">Réference</StyledTableCell>
              <StyledTableCell align="left">Nom</StyledTableCell>
              <StyledTableCell align="left">Description</StyledTableCell>
              <StyledTableCell align="left">Category</StyledTableCell>
              <StyledTableCell align="left">Prix</StyledTableCell>
              <StyledTableCell align="left">Supprimer</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {toysList.map((toy) => (
              <StyledTableRow
                key={toy._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <StyledTableCell component="th" scope="row">
                  {toy._id}
                </StyledTableCell>

                <StyledTableCell
                  className="pointer"
                  align="left"
                  onClick={() => {
                    navigate(`/toydetails/${toy._id}`);
                  }}
                ></StyledTableCell>

                <StyledTableCell align="left">
                  {toy.description}
                </StyledTableCell>
                <StyledTableCell align="left">{toy.category}</StyledTableCell>
                <StyledTableCell align="left">{toy.price} €</StyledTableCell>
                {/* <DeleteIcon fontSize="small" /> */}
                <StyledTableCell align="left">
                  <IconButton
                    aria-label="delete"
                    size="small"
                    color="error"
                    onClick={() => {
                      handleDelet(toy._id);
                    }}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Home;
