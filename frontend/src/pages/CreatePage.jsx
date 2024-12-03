import React, { useState } from "react";
import axios from "axios";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Snackbar,
  Alert
} from "@mui/material";
import { styled } from "@mui/system";

const AnimatedHeading = styled(Typography)(({ theme }) => ({
  position: "relative",
  display: "inline-block",
  color: theme.palette.text.primary,
  "&::after": {
    content: '""',
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "0%",
    height: "2px",
    backgroundColor: theme.palette.primary.main,
    transition: "width 0.5s ease-in-out",
  },
  "&:hover::after": {
    width: "100%",
  },
}));

const CreatePage = () => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    image: null,
  });
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("success");

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Create FormData for multipart/form-data upload
    const data = new FormData();
    data.append('name', formData.name);
    data.append('price', formData.price);
    
    // Ensure image is selected
    if (formData.image) {
      data.append('image', formData.image);
    } else {
      // Show error if no image
      setMessage("Please select an image");
      setSeverity("error");
      setOpen(true);
      return;
    }

    try {
      // Send POST request to backend
      const response = await axios.post('http://localhost:5000/api/products', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Show success message
      setMessage("Product created successfully!");
      setSeverity("success");
      setOpen(true);

      // Reset form
      setFormData({
        name: "",
        price: "",
        image: null
      });
    } catch (error) {
      // Handle error
      console.error("Error creating product:", error);
      setMessage("Failed to create product");
      setSeverity("error");
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      {/* Snackbar for notifications */}
      <Snackbar 
        open={open} 
        autoHideDuration={6000} 
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert 
          onClose={handleClose} 
          severity={severity} 
          sx={{ width: '100%' }}
        >
          {message}
        </Alert>
      </Snackbar>

      <AnimatedHeading variant="h4" gutterBottom>
        Create Product
      </AnimatedHeading>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 3,
        }}
      >
        <TextField
          label="Name"
          name="name"
          variant="outlined"
          fullWidth
          value={formData.name}
          onChange={handleChange}
          required
        />
        <TextField
          label="Price"
          name="price"
          type="number"
          variant="outlined"
          fullWidth
          value={formData.price}
          onChange={handleChange}
          required
        />
        <Button
          variant="outlined"
          component="label"
          fullWidth
        >
          Upload Image
          <input
            type="file"
            name="image"
            accept="image/*"
            hidden
            onChange={handleChange}
          />
        </Button>
        {formData.image && (
          <Typography variant="body2">
            Selected File: {formData.image.name}
          </Typography>
        )}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
        >
          Create Product
        </Button>
      </Box>
    </Container>
  );
};

export default CreatePage;