/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from "react";
import {
  Button,
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
} from "@mui/material";
import LOADING from "../assets/img/eclipse-1s-loading.svg";

const HomeView = ({ setContactsCount }) => {
  const [sprite, setSprite] = useState("male");
  const [seed, setSeed] = useState("");
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    getGeneratedContacts();
  }, []);

  async function getGeneratedContacts() {
    const contacts_json = localStorage.getItem("contacts");
    if (contacts_json) {
      const contacts_obj = JSON.parse(contacts_json);
      let res = [];
      for (let i in contacts_obj) res.push(contacts_obj[i]);
      setContactsCount(res.length);
      setContacts(res);
    }
  }
  const handleSeedChange = async (e) => {
    setLoading(true);
    setTimeout(() => {
      setSeed(e.target.value);
      setLoading(false);
    }, 2000);
  };

  const handleCreateContact = async () => {
    setCreating(true);
    const res = await fetch(`https://randomuser.me/api/?seed=${seed}`);
    const contact_infor = await res.json();
    let contacts_buf = contacts;
    contact_infor.results[0].seed = seed;
    contact_infor.results[0].sprite = sprite;
    contacts_buf.push(contact_infor.results[0]);
    setContacts(contacts_buf);
    setContactsCount(contacts_buf.length);
    localStorage.removeItem("contacts");
    localStorage.setItem("contacts", JSON.stringify(contacts_buf));
    setCreating(false);
  };

  const removeContact = (id) => {
    console.log(id);
    let contacts_buf = contacts;
    contacts_buf.splice(id, 1);
    setContacts(contacts_buf);
    setContactsCount(contacts_buf.length);
    localStorage.removeItem("contacts");
    localStorage.setItem("contacts", JSON.stringify(contacts_buf));
  };
  return (
    <>
      <Box display="flex">
        <Box width="300px" p={5}>
          <FormControl
            fullWidth
            style={{ marginBottom: "10px" }}
            disabled={creating}
          >
            <InputLabel id="sprite-select-label">Sprite</InputLabel>
            <Select
              labelId="sprite-select-label"
              id="sprite-select"
              value={sprite}
              label="Sprite"
              onChange={(e) => setSprite(e.target.value)}
            >
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="femail">Femail</MenuItem>
              <MenuItem value="identicon">Identicon</MenuItem>
              <MenuItem value="initials">Initials</MenuItem>
              <MenuItem value="bottts">Bottts</MenuItem>
              <MenuItem value="avataaars">Avataaars</MenuItem>
              <MenuItem value="jdenticon">Jdenticon</MenuItem>
              <MenuItem value="gridy">Gridy</MenuItem>
              <MenuItem value="micah">Micah</MenuItem>
            </Select>
          </FormControl>
          <TextField
            id="seed_textfield"
            label="Seed"
            variant="outlined"
            onChange={handleSeedChange}
            fullWidth
            disabled={creating}
          />
          <Box
            border="2px solid black"
            borderRadius={2}
            height="200px"
            width="200px"
            m="auto"
            my={2}
          >
            {seed && (
              <img
                src={
                  loading
                    ? LOADING
                    : `https://avatars.dicebear.com/api/${sprite}/${seed}.svg`
                }
                alt="avatar"
              />
            )}
          </Box>
          <Box textAlign="center">
            <Button variant="outlined" onClick={handleCreateContact}>
              Create User
            </Button>
          </Box>
        </Box>
        <Box width="calc(100vw - 200px)" p={5}>
          <Typography>Preview</Typography>
          {seed ? (
            <Box
              width="300px"
              display="flex"
              backgroundColor="rgba(0, 0, 0, 0.5)"
              borderRadius="10px"
              mb={2}
              opacity={0.5}
              style={{ opacity: 0.5 }}
            >
              <img
                src={`https://avatars.dicebear.com/api/${sprite}/${seed}.svg`}
                alt="avatar"
                style={{
                  borderTopLeftRadius: "10px",
                  borderBottomLeftRadius: "10px",
                  marginRight: "10px",
                }}
                width="50px"
              />
              <Box>
                <Typography color="white">{seed}</Typography>
              </Box>
            </Box>
          ) : (
            <Box
              width="300px"
              height="50px"
              backgroundColor="rgba(0, 0, 0, 0.5)"
              borderRadius="10px"
              mb={2}
              opacity={0.5}
              display="flex"
              justifyContent="center"
              alignItems="center"
              style={{ opacity: 0.5 }}
            >
              <Typography>Please input seed</Typography>
            </Box>
          )}
          <Typography>Contact List</Typography>
          {contacts?.map((contact, index) => {
            return (
              <Box
                key={contact.email}
                width="300px"
                display="flex"
                backgroundColor="rgba(0, 0, 0, 0.5)"
                borderRadius="10px"
                mb={2}
                onClick={() => removeContact(index)}
                style={{ cursor: "pointer" }}
              >
                <img
                  src={`https://avatars.dicebear.com/api/${contact.sprite}/${contact.seed}.svg`}
                  alt="avatar"
                  style={{
                    borderTopLeftRadius: "10px",
                    borderBottomLeftRadius: "10px",
                    marginRight: "10px",
                  }}
                  width="50px"
                />
                <Box>
                  <Typography color="white">
                    {contact.name.first}&nbsp;
                    {contact.name.last}
                  </Typography>
                  <Typography color="white">{contact.email}</Typography>
                </Box>
              </Box>
            );
          })}
        </Box>
      </Box>
    </>
  );
};

export default HomeView;
