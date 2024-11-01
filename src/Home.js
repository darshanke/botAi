import React, { useState } from 'react';
import {
  Box,
  Grid,
  Typography,
  Button,
  TextField,
  IconButton,
  Drawer,
  Modal,
  Rating,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ThumbUpIcon from '@mui/icons-material/ThumbUp'; // Like icon
import ThumbDownIcon from '@mui/icons-material/ThumbDown'; // Dislike icon
import icon from './assets/Group 1000011095.png'; // User image
import edit from './assets/image 31.png'; // AI image

const Home = () => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [inputValue, setInputValue] = useState(''); // State for text field value
  const [chatHistory, setChatHistory] = useState([]); // State for chat history
  const [showPredefinedButtons, setShowPredefinedButtons] = useState(true); // Control button visibility

  // State for modal feedback
  const [isFeedbackModalOpen, setFeedbackModalOpen] = useState(false);
  const [currentDislikeMessage, setCurrentDislikeMessage] = useState('');
  const [starRating, setStarRating] = useState(0);
  const [messageToRate, setMessageToRate] = useState(null); // Message to rate

  const commonStyles = {
    background: `
      linear-gradient(0deg, rgba(215, 199, 244, 1), rgba(215, 199, 244, 1)),
      linear-gradient(0deg, rgba(215, 199, 244, 0.8), rgba(215, 199, 244, 0.8)),
      linear-gradient(0deg, rgba(215, 199, 244, 0.6), rgba(215, 199, 244, 0.6)),
      linear-gradient(0deg, rgba(215, 199, 244, 0.4), rgba(215, 199, 244, 0.4))
    `,
  };

  const toggleDrawer = () => {
    setDrawerOpen(!isDrawerOpen);
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleButtonClick = async (text) => {
    setInputValue(text); // Update the input value based on button click
    await handleSubmit(); // Automatically submit after button click
    setShowPredefinedButtons(false); // Hide the predefined buttons
  };

  const handleSubmit = async (event) => {
    if (event) event.preventDefault(); // Prevent default form submission
    if (!inputValue.trim()) return;

    // Add user's message to chat history with timestamp
    const userMessage = {
      user: 'You',
      text: inputValue,
      type: 'question',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), // Current time
    };
    setChatHistory((prev) => [...prev, userMessage]);

    // Simulate AI response
    const aiResponse = await fetchAIResponse(inputValue);

    // Add AI's response to chat history with timestamp
    const aiMessage = {
      user: 'AI',
      text: aiResponse,
      type: 'response',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), // Current time
    };
    setChatHistory((prev) => [...prev, aiMessage]);

    setInputValue(''); // Clear input after submission
  };

  // Placeholder function to simulate AI response
  const fetchAIResponse = async (query) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("As an AI language model, I don't have the details.");
      }, 1000); // Simulate a 1-second delay
    });
  };

  const handleLike = (index) => {
    // Implement like functionality here
  };

  const handleDislike = (index) => {
    setCurrentDislikeMessage(index);
    setFeedbackModalOpen(true); // Open the feedback modal
  };

  const handleFeedbackSubmit = () => {
    // Implement feedback submission here
    setFeedbackModalOpen(false);
    setCurrentDislikeMessage('');
  };

  const handleStarRatingSubmit = () => {
    // Implement star rating submission here
  };

  return (
    <Box sx={{ height: '100vh' }}>
      <Grid container sx={{ height: '100%' }}>
        {/* Sidebar for larger screens */}
        <Grid
          item
          xs={0}
          sm={2}
          sx={{
            display: { xs: 'none', sm: 'block' },
            padding: 2,
            backgroundColor: '#f0f0f0',
          }}
        >
          <Box
            variant="h6"
            sx={{
              display: 'flex',
              height: '47px',
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
              textAlign: 'center',
              fontWeight: 'bold',
              background: commonStyles.background,
            }}
          >
            <img src={icon} alt="icon" />
            <Typography>New Chat</Typography>
            <img src={edit} alt="icon" />
          </Box>
          <Button
            variant="contained"
            sx={{
              marginTop: '50px',
              height: '39px',
              borderRadius: '10px',
              background: commonStyles.background,
              fontFamily: 'Ubuntu',
              fontSize: {
                xs: '14px',
                sm: '16px',
                md: '16px',
                lg: '18px',
              },
              fontWeight: 700,
              lineHeight: {
                xs: '16px',
                sm: '18px',
                md: '18px',
                lg: '20px',
              },
              textAlign: 'left',
              color: '#414146',
              "&:hover": {
                backgroundColor: "#B89FE2",
              },
              width: {
                xs: '100%',
                sm: 'auto',
              },
            }}
          >
            Past Conversations
          </Button>
        </Grid>

        {/* Mobile Drawer (Hamburger Menu) */}
        <Drawer anchor="left" open={isDrawerOpen} onClose={toggleDrawer}>
          <Box sx={{ width: 250, padding: 2 }}>
            <Box
              variant="h6"
              sx={{
                display: 'flex',
                height: '47px',
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'center',
                textAlign: 'center',
                fontWeight: 'bold',
                background: commonStyles.background,
              }}
            >
              <img src={icon} alt="icon" />
              <Typography>New Chat</Typography>
              <img src={edit} alt="icon" />
            </Box>
            <Button
              variant="contained"
              sx={{
                marginTop: '50px',
                height: '39px',
                borderRadius: '10px',
                background: commonStyles.background,
                fontFamily: 'Ubuntu',
                fontSize: {
                  xs: '14px',
                  sm: '16px',
                  md: '16px',
                  lg: '18px',
                },
                fontWeight: 700,
                lineHeight: {
                  xs: '16px',
                  sm: '18px',
                  md: '18px',
                  lg: '20px',
                },
                textAlign: 'left',
                color: '#414146',
                "&:hover": {
                  backgroundColor: "#B89FE2",
                },
                width: {
                  xs: '100%',
                  sm: 'auto',
                },
              }}
            >
              Past Conversations
            </Button>
          </Box>
        </Drawer>

        {/* Main content area */}
        <Grid item xs={12} sm={10} sx={{ padding: 2, position: 'relative', width: '100%' }}>
          {/* Header with Hamburger for mobile */}
          <Box sx={{ display: 'flex', alignItems: 'center', paddingBottom: 2, marginBottom: 2 }}>
            <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer} sx={{ display: { sm: 'none' } }}>
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              sx={{
                ml: { xs: 1, sm: 0 },
                fontFamily: 'Ubuntu',
                fontSize: '28px',
                fontWeight: 700,
                lineHeight: '32.17px',
                textAlign: 'left',
                color: '#9785BA',
              }}
            >
              Bot AI
            </Typography>
          </Box>

          {/* Chat History */}
          <Box sx={{ maxHeight: '60%', overflowY: 'auto', paddingBottom: '20px' }}>
            {chatHistory.map((msg, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '16px',
                  height: '105px',
                  gap: '0px',
                  borderRadius: '20px',
                  background: '#D7C7F421',
                  padding: '10px',
                }}
              >
                <img src={msg.user === 'You' ? icon : edit} alt="User Icon" style={{ borderRadius: '50%', width: '40px', height: '40px' }} />
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="body1" sx={{ fontWeight: msg.user === 'You' ? 'bold' : 'normal' }}>
                    {msg.user}: {msg.text}
                  </Typography>
                  <Typography variant="caption" color="textSecondary">
                    {msg.time} {/* Display the local time here */}
                  </Typography>
                  {msg.type === 'response' && (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <IconButton onClick={() => handleLike(index)}>
                        <ThumbUpIcon color="primary" />
                      </IconButton>
                      <IconButton onClick={() => handleDislike(index)}>
                        <ThumbDownIcon color="secondary" />
                      </IconButton>
                    </Box>
                  )}
                </Box>
              </Box>
            ))}
          </Box>

          {/* Main Content */}
          <Box sx={{ textAlign: 'center', padding: 2, height: '80%' }}>
            <Typography variant="h5" gutterBottom>
              How Can I Help You Today?
            </Typography>
            <img src={icon} alt="icon" />

            {/* Conditional Rendering of Predefined Buttons */}
            {showPredefinedButtons && (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 2, mb: 3 }}>
                {['Hi, what is the weather', 'Hi, what is my location', 'Hi, what is the temperature', 'Hi, how are you'].map((text) => (
                  <Button
                    key={text}
                    variant="outlined"
                    sx={{ width: '541px' }}
                    onClick={() => handleButtonClick(text)}
                  >
                    {text}
                  </Button>
                ))}
              </Box>
            )}

            {/* Input Section at the Bottom */}
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                gap: 1,
                position: 'absolute',
                bottom: '0px',
              }}
            >
              <TextField
                variant="outlined"
                placeholder="Ask"
                value={inputValue}
                onChange={handleInputChange} // Allow typing
                sx={{
                  width: {
                    xs: '80%',
                    sm: '80%',
                    md: '1000px',
                  },
                }}
              />
              <Button variant="contained" onClick={handleSubmit}>Ask</Button>
              <Button variant="outlined">Save</Button>
            </Box>
          </Box>
        </Grid>
      </Grid>

      {/* Feedback Modal */}
      <Modal open={isFeedbackModalOpen} onClose={() => setFeedbackModalOpen(false)}>
        <Box sx={{ padding: 4, backgroundColor: 'white', borderRadius: 2, maxWidth: 400, margin: 'auto', marginTop: '20%' }}>
          <Typography variant="h6">Dislike Feedback</Typography>
          <TextField
            variant="outlined"
            label="Your Feedback"
            value={currentDislikeMessage.feedback || ''}
            onChange={(e) => setCurrentDislikeMessage({ ...currentDislikeMessage, feedback: e.target.value })}
            fullWidth
          />
          <Button variant="contained" onClick={handleFeedbackSubmit} sx={{ marginTop: 2 }}>Submit</Button>
        </Box>
      </Modal>

      {/* Star Rating Modal */}
      <Modal open={messageToRate !== null} onClose={() => setMessageToRate(null)}>
        <Box sx={{ padding: 4, backgroundColor: 'white', borderRadius: 2, maxWidth: 400, margin: 'auto', marginTop: '20%' }}>
          <Typography variant="h6">Rate the Response</Typography>
          <Rating
            value={starRating}
            onChange={(event, newValue) => setStarRating(newValue)}
            max={5}
          />
          <Button variant="contained" onClick={handleStarRatingSubmit} sx={{ marginTop: 2 }}>Submit Rating</Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default Home;
  