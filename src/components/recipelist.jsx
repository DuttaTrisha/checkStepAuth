import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/system";
import "./commonstyle.css";

export default function Recipelist({ recipes, viewMode }) {
  return (
    <>
      <Grid container spacing={2} className="recipe-block">
        {viewMode === "card" ? (
          <>
            {recipes.map((item) => {
              return (
                <>
                  <Grid item xs={12} sm={6} md={4} lg={4}>
                    <Card key={item.id} className="recipe-card">
                      <CardContent>
                        <Typography variant="h5">{item.name}</Typography>
                        <p>{item.description}</p>
                        <p>{item.deliver_via}</p>
                        <p>{item.entityType}</p>
                        <p>{item.creationDate}</p>
                        <p>{item.last_update_comment}</p>
                      </CardContent>
                    </Card>
                  </Grid>
                </>
              );
            })}
          </>
        ) : (
          <>
            <TableContainer component={Paper}>
              <Table className="table-block">
                <TableHead>
                  <TableRow>
                    <TableCell>Recipe Name</TableCell>
                    <TableCell>Recipe Description</TableCell>
                    <TableCell>Delivered Via</TableCell>
                    <TableCell>Entity Type</TableCell>
                    <TableCell>Created On</TableCell>
                    <TableCell>Comment</TableCell>
                    
                  </TableRow>
                </TableHead>
                <TableBody>
                  {recipes.map((item) => {
                    return (
                      <>
                        <TableRow key={item.id}>
                          <TableCell>{item.name}</TableCell>
                          <TableCell>{item.description}</TableCell>
                          <TableCell>{item.deliver_via}</TableCell>
                          <TableCell>{item.entityType}</TableCell>
                          <TableCell>{item.creationDate}</TableCell>
                          <TableCell>{item.last_update_comment}</TableCell>
                        </TableRow>
                      </>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        )}
      </Grid>
    </>
  );
}
