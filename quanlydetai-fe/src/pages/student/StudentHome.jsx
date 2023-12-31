import React, { useEffect, useState } from "react";
import {
  Button,
  Box,
  Typography,
  TextField,
  Grid,
  Snackbar,
  Alert,
} from "@mui/material";
import MainLayout from "../../components/layout/MainLayout";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineOppositeContent, {
  timelineOppositeContentClasses,
} from "@mui/lab/TimelineOppositeContent";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { findUser } from "../../utils/api/user";
import { findTopicOfStudent } from "../../utils/api/topic";

function Notification({ open, message, type, handleClose }) {
  
  return (
    <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={type}>
        {message}
      </Alert>
    </Snackbar>
  );
}

function StudentHome() {
  const [currentUser, setCurrentUser] = useState({});
  const [currentTopic, setCurrentTopic] = useState({});
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    type: "",
  });

  const showNotification = (message, type) => {
    setNotification({ open: true, message, type });

    // Clear the notification after a few seconds
    setTimeout(() => {
      setNotification({ open: false, message: "", type: "" });
    }, 3000);
  };

  const handleCloseNotification = () => {
    setNotification({ open: false, message: "", type: "" });
  };

  const handleUpdateClick = () => {
    try {
      // Add your logic for updating data here

      // For example, you might simulate a successful update
      // Replace the following line with your actual update logic
      // await updateData(updatedData);

      // Show success notification
      showNotification("Cập nhật thành công", "success");

      // You may also want to reload data after a successful update
      // Uncomment the following line if needed
      // await getCurrentTopic();
    } catch (error) {
      console.error("Error updating data:", error);

      // Show error notification
      showNotification("Cập nhật thất bại", "error");
    }
  };

  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const id = JSON.parse(localStorage.getItem("user"))._id;
        const res = await findUser(id);
        setCurrentUser(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getCurrentUser();
  }, []);

  useEffect(() => {
    const getCurrentTopic = async () => {
      try {
        const res = await findTopicOfStudent(currentUser?._id);
        setCurrentTopic(res.data);
      } catch (error) {}
    };
    currentUser && getCurrentTopic();
  }, [currentUser]);

  return (
    <MainLayout type="student">
      <Button fullWidth size="large" variant="contained">
        Quản lý đề tài
      </Button>
      <Box mt={4}>
        {currentTopic ? (
          <>
            <Typography variant="subtitle2">
              Tên đề tài: {currentTopic?.title}
            </Typography>
            <Typography variant="subtitle2" mt={2}>
              Mô tả đề tài: {currentTopic?.description}
            </Typography>
            <Box mt={4}>
              <Timeline
                sx={{
                  [`& .${timelineOppositeContentClasses.root}`]: {
                    flex: 0.2,
                  },
                }}
              >
                <TimelineItem>
                  <TimelineOppositeContent color="textSecondary">
                    14/11/2023
                  </TimelineOppositeContent>
                  <TimelineSeparator>
                    <TimelineDot />
                    <TimelineConnector />
                  </TimelineSeparator>
                  <TimelineContent>
                    <Accordion>
                      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography>Giai đoạn 1: Khởi tạo dự án</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Box mt={4}>
                          <Typography
                            variant="subtitle1"
                            textAlign={"center"}
                            fontWeight={"bold"}
                          >
                            Báo cáo tiến độ
                          </Typography>
                          <Grid container mt={4}>
                            <Grid item xs={3}>
                              <Typography variant="subtitle2">
                                Nộp báo cáo:
                              </Typography>
                            </Grid>
                            <Grid item xs={8}>
                              <TextField type="file" size="small" fullWidth />
                            </Grid>
                          </Grid>
                          <Grid container mt={4}>
                            <Grid item xs={3}>
                              <Typography variant="subtitle2">
                                Tiến độ:
                              </Typography>
                            </Grid>
                            <Grid item xs={8}>
                              <TextField size="small" fullWidth />
                            </Grid>
                          </Grid>
                          <Box
                            display={"flex"}
                            justifyContent={"center"}
                            mt={2}
                          >
                            <Button
                              variant="contained"
                              size="small"
                              onClick={handleUpdateClick}
                            >
                              Cập nhật
                            </Button>
                          </Box>
                        </Box>
                      </AccordionDetails>
                    </Accordion>
                  </TimelineContent>
                </TimelineItem>
                <TimelineItem>
                  <TimelineOppositeContent color="textSecondary">
                    24/11/2023
                  </TimelineOppositeContent>
                  <TimelineSeparator>
                    <TimelineDot />
                    <TimelineConnector />
                  </TimelineSeparator>
                  <TimelineContent>
                    <Accordion>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                      >
                        <Typography>Giai đoạn 2: Xây dựng sản phẩm</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Box mt={4}>
                          <Typography
                            variant="subtitle1"
                            textAlign={"center"}
                            fontWeight={"bold"}
                          >
                            Báo cáo tiến độ
                          </Typography>
                          <Grid container mt={4}>
                            <Grid item xs={3}>
                              <Typography variant="subtitle2">
                                Nộp báo cáo:
                              </Typography>
                            </Grid>
                            <Grid item xs={8}>
                              <TextField type="file" size="small" fullWidth />
                            </Grid>
                          </Grid>
                          <Grid container mt={4}>
                            <Grid item xs={3}>
                              <Typography variant="subtitle2">
                                Tiến độ:
                              </Typography>
                            </Grid>
                            <Grid item xs={8}>
                              <TextField size="small" fullWidth />
                            </Grid>
                          </Grid>
                          <Box
                            display={"flex"}
                            justifyContent={"center"}
                            mt={2}
                          >
                            <Button variant="contained" size="small">
                              Cập nhật
                            </Button>
                          </Box>
                        </Box>
                      </AccordionDetails>
                    </Accordion>
                  </TimelineContent>
                </TimelineItem>
                <TimelineItem>
                  <TimelineOppositeContent color="textSecondary">
                    30/11/2023
                  </TimelineOppositeContent>
                  <TimelineSeparator>
                    <TimelineDot />
                  </TimelineSeparator>
                  <TimelineContent>
                    <Accordion>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                      >
                        <Typography>Giai đoạn 3: Kết thúc dự án</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Box mt={4}>
                          <Typography
                            variant="subtitle1"
                            textAlign={"center"}
                            fontWeight={"bold"}
                          >
                            Báo cáo tiến độ
                          </Typography>
                          <Grid container mt={4}>
                            <Grid item xs={3}>
                              <Typography variant="subtitle2">
                                Nộp báo cáo:
                              </Typography>
                            </Grid>
                            <Grid item xs={8}>
                              <TextField type="file" size="small" fullWidth />
                            </Grid>
                          </Grid>
                          <Grid container mt={4}>
                            <Grid item xs={3}>
                              <Typography variant="subtitle2">
                                Tiến độ:
                              </Typography>
                            </Grid>
                            <Grid item xs={8}>
                              <TextField size="small" fullWidth />
                            </Grid>
                          </Grid>
                          <Box
                            display={"flex"}
                            justifyContent={"center"}
                            mt={2}
                          >
                            <Button variant="contained" size="small">
                              Cập nhật
                            </Button>
                          </Box>
                        </Box>
                      </AccordionDetails>
                    </Accordion>
                  </TimelineContent>
                </TimelineItem>
              </Timeline>
            </Box>
          </>
        ) : (
          <Box
            mt={4}
            display={"flex"}
            alignItems={"center"}
            gap={2}
            justifyContent={"center"}
            sx={{ cursor: "pointer" }}
          >
            <Typography variant="subtitle2">
              Hiện tại bạn chưa đăng kí đề tài nào
            </Typography>
            <Button variant="contained" size="small" href="/sub-topic">
              Đăng kí
            </Button>
          </Box>
        )}
      </Box>
      {/* Notification Component */}
      <Notification
        open={notification.open}
        message={notification.message}
        type={notification.type}
        handleClose={handleCloseNotification}
      />
    </MainLayout>
  );
}

export default StudentHome;
