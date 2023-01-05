import "./AddAToy.css";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

// import MUI
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";

import { useState } from "react";

const AddAToy = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState();
  const [price, setPrice] = useState();

  const navigate = useNavigate();

  const handleCategory = (event) => {
    const categorySelected = event.target.value;
    setCategory(categorySelected);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (name && description && price && category) {
        let toyToCreate = {
          name: name,
          description: description,
          price: price,
          category_id: category,
        };
        // console.log("toyToCreate ", toyToCreate);
        const response = await axios.post(
          "http://localhost:3000/toys/create",
          toyToCreate
        );
        // console.log(response.data);
        if (response.data) {
          alert(`Vous avez ajouté ${name}`);
          navigate("/");
        }
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <div className="container">
      <h2>Ajouter un jouet</h2>
      <Link to="/">Toys List</Link>

      <Box
        onSubmit={handleSubmit}
        component="form"
        sx={{
          "& > :not(style)": {
            m: 2,
            width: "30ch",
            display: "flex",
            mx: "auto",
          },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="outlined-name"
          label="Name"
          size="small"
          placeholder="Name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />

        <TextField
          id="outlined-description"
          label="Description"
          size="small"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />

        <FormControl fullWidth sx={{ m: 1, minWidth: 120 }} size="small">
          <InputLabel id="category-label">Category</InputLabel>
          <Select
            labelId="category-label"
            id="category-select"
            label="Category"
            onChange={handleCategory}
          >
            <MenuItem value={1}>Boardgames</MenuItem>
            <MenuItem value={3}>Outdoor</MenuItem>
            <MenuItem value={2}>Construction</MenuItem>
            <MenuItem value={0}>Videogames</MenuItem>
          </Select>
        </FormControl>

        <TextField
          id="outlined-price"
          label="Price"
          size="small"
          value={price}
          onChange={(event) => setPrice(parseInt(event.target.value))}
        />

        <Button variant="contained" onClick={handleSubmit}>
          Envoyer
        </Button>
      </Box>
    </div>
  );
};

export default AddAToy;
