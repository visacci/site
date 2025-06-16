import React, {
  useState,
  useEffect,
  createContext,
  useMemo,
  useContext,
} from "react";
import axios from "axios";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  Switch,
  CssBaseline,
  createTheme,
  ThemeProvider,
  Container,
  Paper,
  Grid,
  TextField,
  Chip,
  Card,
  CardContent,
  CardActions,
  useTheme,
  Stack,
  Avatar,
  responsiveFontSizes,
  Fade,
  Grow,
  Slide,
  Zoom,
  useScrollTrigger,
  Fab,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import MenuIcon from "@mui/icons-material/Menu";
import InfoIcon from "@mui/icons-material/Info";
import CodeIcon from "@mui/icons-material/Code";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import { styled } from "@mui/system";
import { keyframes } from "@emotion/react";
import { motion } from "framer-motion";

// Animation keyframes
const floatAnimation = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
  100% { transform: translateY(0px); }
`;

const pulseAnimation = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

// Create a context for the theme mode
const ColorModeContext = createContext({ toggleColorMode: () => {} });

// Styled components with animations
const HeroSection = styled(Box)(({ theme }) => ({
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  color: theme.palette.text.primary,
  background:
    theme.palette.mode === "dark"
      ? `linear-gradient(135deg, ${theme.palette.grey[900]} 0%, ${theme.palette.grey[800]} 100%)`
      : `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
  padding: theme.spacing(8, 0),
  position: "relative",
  overflow: "hidden",
  "&:before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "url(/noise.png)",
    opacity: 0.03,
    pointerEvents: "none",
  },
  [theme.breakpoints.down("md")]: {
    minHeight: "90vh",
    padding: theme.spacing(6, 0),
  },
}));

const Section = styled(Box)(({ theme }) => ({
  padding: theme.spacing(10, 0),
  position: "relative",
  [theme.breakpoints.down("md")]: {
    padding: theme.spacing(8, 0),
  },
}));

const AnimatedAvatar = styled(Avatar)(({ theme }) => ({
  width: 180,
  height: 180,
  border: `4px solid ${theme.palette.common.white}`,
  boxShadow: theme.shadows[10],
  animation: `${floatAnimation} 6s ease-in-out infinite`,
  "&:hover": {
    animation: `${pulseAnimation} 1.5s ease-in-out infinite`,
  },
}));

const SkillCard = styled(Card)(({ theme }) => ({
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "translateY(-10px)",
    boxShadow: theme.shadows[10],
  },
}));

const ProjectCard = styled(Card)(({ theme }) => ({
  transition: "all 0.3s ease",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  "&:hover": {
    transform: "translateY(-10px)",
    boxShadow: theme.shadows[10],
    "& .project-image": {
      transform: "scale(1.05)",
    },
  },
}));

const ProjectImage = styled("div")(({ theme }) => ({
  width: "100%",
  height: 200,
  backgroundSize: "cover",
  backgroundPosition: "center",
  transition: "transform 0.5s ease",
  borderTopLeftRadius: "inherit",
  borderTopRightRadius: "inherit",
}));

const ScrollToTop = (props) => {
  const { children } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      "#back-to-top-anchor"
    );

    if (anchor) {
      anchor.scrollIntoView({
        block: "center",
        behavior: "smooth",
      });
    }
  };

  return (
    <Zoom in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{ position: "fixed", bottom: 32, right: 32 }}
      >
        {children}
      </Box>
    </Zoom>
  );
};

const Home = () => {
  const [comment, setComment] = useState("");
  const [coms, setComs] = useState([]);
  const [mobileOpen, setMobileOpen] = useState(false);
  const url = "https://site-backend-ndps.onrender.com/api/comments/send";
  const url2 = "https://site-backend-ndps.onrender.com/api/comments";

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const navItems = [
    { name: "About", id: "about", icon: <InfoIcon /> },
    { name: "Skills", id: "skills", icon: <CodeIcon /> },
    { name: "Projects", id: "projects", icon: <DashboardIcon /> },
    { name: "Contact", id: "contact", icon: <ContactMailIcon /> },
  ];

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const res = await axios.post(url, { comment });
      setComs([...coms, res.data]);
      setComment("");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const comments = async () => {
      try {
        const res = await axios.get(url2);
        setComs(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    comments();
  }, []);

  const renderComments = coms.map((comment) => {
    return <Comment comment={comment} key={comment._id} />;
  });

  const skills = [
    { name: "MongoDB", icon: <i className="devicon-mongodb-plain colored" /> },
    {
      name: "Express.js",
      icon: <i className="devicon-express-original colored" />,
    },
    { name: "React", icon: <i className="devicon-react-original colored" /> },
    { name: "Node.js", icon: <i className="devicon-nodejs-plain colored" /> },
    { name: "Next.js", icon: <i className="devicon-nextjs-plain colored" /> },
    {
      name: "Material-UI",
      icon: <i className="devicon-materialui-plain colored" />,
    },
    {
      name: "JavaScript",
      icon: <i className="devicon-javascript-plain colored" />,
    },
    {
      name: "TypeScript",
      icon: <i className="devicon-typescript-plain colored" />,
    },
    { name: "HTML", icon: <i className="devicon-html5-plain colored" /> },
    { name: "CSS", icon: <i className="devicon-css3-plain colored" /> },
    { name: "Git", icon: <i className="devicon-git-plain colored" /> },
    { name: "RESTful APIs", icon: <i className="devicon-api-plain colored" /> },
  ];

  const projects = [
    {
      name: "E-commerce Platform",
      description:
        "A full-stack e-commerce application with user authentication, product catalog, shopping cart, and order management.",
      link: "https://your-ecommerce-project.com",
      image:
        "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      tech: ["React", "Node.js", "MongoDB", "Redux"],
    },
    {
      name: "Social Media Dashboard",
      description:
        "A dashboard for managing social media posts, scheduling, and analytics, integrated with various social platforms.",
      link: "https://your-social-media-project.com",
      image:
        "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      tech: ["Next.js", "TypeScript", "GraphQL", "Tailwind CSS"],
    },
    {
      name: "Task Management App",
      description:
        "A collaborative task management application with real-time updates and user roles.",
      link: "https://your-task-management-project.com",
      image:
        "https://images.unsplash.com/photo-1543286386-713bdd548da4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      tech: ["React", "Firebase", "Material-UI", "React DnD"],
    },
    {
      name: "Real-time Chat Application",
      description:
        "A real-time chat application built with WebSockets, supporting private and group chats.",
      link: "https://your-chat-app-project.com",
      image:
        "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      tech: ["Socket.io", "Node.js", "React", "MongoDB"],
    },
  ];

  return (
    <Box sx={{ flexGrow: 1, overflowX: "hidden" }}>
      <AppBar
        position="fixed"
        color="primary"
        elevation={0}
        sx={{
          backdropFilter: "blur(10px)",
          backgroundColor: "rgba(0, 0, 0, 0.7)",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              Katende Ibrahim
            </motion.div>
          </Typography>
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
            {navItems.map((item) => (
              <motion.div whileHover={{ scale: 1.05 }} key={item.id}>
                <Button color="inherit" href={`#${item.id}`}>
                  {item.name}
                </Button>
              </motion.div>
            ))}
            <ModeToggle />
          </Box>
        </Toolbar>
      </AppBar>

      <Toolbar id="back-to-top-anchor" />

      <nav>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: 240 },
          }}
        >
          <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
            <Typography variant="h6" sx={{ my: 2 }}>
              Katende Ibrahim
            </Typography>
            <List>
              {navItems.map((item) => (
                <ListItem key={item.id} disablePadding>
                  <ListItemButton
                    sx={{ textAlign: "left", pl: 4 }}
                    href={`#${item.id}`}
                  >
                    {item.icon && <ListItemIcon>{item.icon}</ListItemIcon>}
                    <ListItemText primary={item.name} />
                  </ListItemButton>
                </ListItem>
              ))}
              <ListItem disablePadding>
                <ListItemButton sx={{ textAlign: "left", pl: 4 }}>
                  <ListItemIcon>
                    {" "}
                    {/* Placeholder for ModeToggle icon */}
                  </ListItemIcon>
                  <ListItemText primary="Toggle Mode" />
                  <ModeToggle />
                </ListItemButton>
              </ListItem>
            </List>
          </Box>
        </Drawer>
      </nav>

      <HeroSection>
        <Container maxWidth="md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Stack spacing={4} alignItems="center">
              <AnimatedAvatar alt="Katende Ibrahim" src="/1.jpg" />
              <Typography
                variant="h2"
                component="h1"
                gutterBottom
                sx={{ fontWeight: 700 }}
              >
                Hi, I'm{" "}
                <span style={{ color: useTheme().palette.secondary.main }}>
                  Katende Ibrahim
                </span>
              </Typography>
              <Typography
                variant="h5"
                component="p"
                paragraph
                sx={{ maxWidth: "80%" }}
              >
                Senior Full-Stack Developer specializing in MERN stack
                applications with a passion for creating exceptional digital
                experiences.
              </Typography>
              <Stack direction="row" spacing={2}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="contained"
                    color="secondary"
                    size="large"
                    href="#projects"
                    sx={{ px: 4, py: 1.5 }}
                  >
                    View My Work
                  </Button>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="outlined"
                    color="secondary"
                    size="large"
                    href="#contact"
                    sx={{ px: 4, py: 1.5 }}
                  >
                    Contact Me
                  </Button>
                </motion.div>
              </Stack>
            </Stack>
          </motion.div>
        </Container>
      </HeroSection>

      <Section id="about">
        <Container maxWidth="md">
          <Fade in timeout={1000}>
            <Paper
              elevation={6}
              sx={{
                p: 6,
                borderRadius: "16px",
                backdropFilter: "blur(10px)",
                backgroundColor: "rgba(255, 255, 255, 0.1)",
              }}
            >
              <Typography
                variant="h3"
                component="h2"
                gutterBottom
                align="center"
                sx={{ mb: 4 }}
              >
                About Me
              </Typography>
              <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                  <Typography
                    variant="body1"
                    paragraph
                    sx={{ fontSize: "1.1rem" }}
                  >
                    As a dedicated full-stack software engineer with over 6
                    years of hands-on experience, I specialize in developing
                    robust and dynamic web applications using cutting-edge
                    technologies. My passion lies in bringing innovative ideas
                    to life through clean, efficient, and scalable code.
                  </Typography>
                  <Typography
                    variant="body1"
                    paragraph
                    sx={{ fontSize: "1.1rem" }}
                  >
                    My expertise primarily lies in the{" "}
                    <strong>MERN stack</strong> (MongoDB, Express.js, React,
                    Node.js), which allows me to seamlessly manage both frontend
                    and backend development. I am adept at designing intuitive
                    user interfaces with React.js, focusing on component
                    reusability and optimizing performance for exceptional user
                    experiences.
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography
                    variant="body1"
                    paragraph
                    sx={{ fontSize: "1.1rem" }}
                  >
                    On the backend, I build secure and high-performing RESTful
                    and GraphQL APIs with Node.js and Express.js, ensuring
                    efficient data flow and robust authentication. I'm also
                    experienced with modern frontend frameworks like Next.js and
                    state management solutions like Redux and Context API.
                  </Typography>
                  <Typography
                    variant="body1"
                    paragraph
                    sx={{ fontSize: "1.1rem" }}
                  >
                    I am committed to delivering high-quality software solutions
                    that not only meet but exceed expectations. My development
                    approach is rooted in best practices, including continuous
                    integration, agile methodologies, and thorough testing,
                    ensuring reliable and maintainable applications.
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          </Fade>
        </Container>
      </Section>

      <Section id="skills" sx={{ bgcolor: "background.paper" }}>
        <Container maxWidth="lg">
          <Slide direction="up" in timeout={800}>
            <Box>
              <Typography
                variant="h3"
                component="h2"
                gutterBottom
                align="center"
                sx={{ mb: 6 }}
              >
                My Skills
              </Typography>
              <Grid container spacing={4} justifyContent="center">
                {skills.map((skill, index) => (
                  <Grid item xs={6} sm={4} md={3} key={index}>
                    <Grow in timeout={800 + index * 100}>
                      <SkillCard
                        raised
                        sx={{ p: 3, textAlign: "center", height: "100%" }}
                      >
                        <Box sx={{ fontSize: 48, mb: 2, minHeight: 48 }}>
                          {skill.icon}
                        </Box>
                        <Typography variant="h6" component="div">
                          {skill.name}
                        </Typography>
                      </SkillCard>
                    </Grow>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Slide>
        </Container>
      </Section>

      <Section id="projects">
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            component="h2"
            gutterBottom
            align="center"
            sx={{ mb: 6 }}
          >
            Featured Projects
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            {projects.map((project, index) => (
              <Grid item xs={12} sm={6} md={6} key={index}>
                <Grow in timeout={800 + index * 200}>
                  <ProjectCard raised>
                    <ProjectImage
                      className="project-image"
                      style={{ backgroundImage: `url(${project.image})` }}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography variant="h5" component="div" gutterBottom>
                        {project.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        paragraph
                      >
                        {project.description}
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          flexWrap: "wrap",
                          gap: 1,
                          mt: 2,
                        }}
                      >
                        {project.tech.map((tech, i) => (
                          <motion.div key={i} whileHover={{ scale: 1.1 }}>
                            <Paper
                              elevation={1}
                              sx={{ px: 1.5, py: 0.5, borderRadius: 2 }}
                            >
                              <Typography variant="caption">{tech}</Typography>
                            </Paper>
                          </motion.div>
                        ))}
                      </Box>
                    </CardContent>
                    <CardActions sx={{ justifyContent: "flex-end", p: 2 }}>
                      <motion.div whileHover={{ scale: 1.05 }}>
                        <Button
                          size="small"
                          variant="contained"
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          View Project
                        </Button>
                      </motion.div>
                    </CardActions>
                  </ProjectCard>
                </Grow>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Section>

      <Section id="contact" sx={{ bgcolor: "background.paper" }}>
        <Container maxWidth="md">
          <Fade in timeout={1000}>
            <Paper
              elevation={6}
              sx={{
                p: 6,
                borderRadius: "16px",
                backdropFilter: "blur(10px)",
                backgroundColor: "rgba(255, 255, 255, 0.1)",
              }}
            >
              <Typography
                variant="h3"
                component="h2"
                gutterBottom
                align="center"
                sx={{ mb: 4 }}
              >
                Get in Touch
              </Typography>
              <Typography
                variant="body1"
                paragraph
                align="center"
                sx={{ mb: 4 }}
              >
                I'm currently available for freelance work and full-time
                positions. If you have a project that needs my expertise or just
                want to say hi, feel free to reach out!
              </Typography>

              <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                  <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
                    Contact Information
                  </Typography>
                  <Stack spacing={2}>
                    <Typography variant="body1">
                      <strong>Email:</strong> visacciallanz14@gmail.com
                    </Typography>
                    <Typography variant="body1">
                      <strong>Phone:</strong> +256748497050
                    </Typography>
                    <Typography variant="body1">
                      <strong>Location:</strong> Kampala, Uganda
                    </Typography>
                  </Stack>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
                    Connect With Me
                  </Typography>
                  <Stack direction="row" spacing={2}>
                    <motion.div whileHover={{ scale: 1.1 }}>
                      <IconButton
                        color="primary"
                        href="https://linkedin.com/in/yourprofile"
                        target="_blank"
                        size="large"
                      >
                        <i
                          className="fab fa-linkedin-in"
                          style={{ fontSize: "1.5rem" }}
                        />
                      </IconButton>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.1 }}>
                      <IconButton
                        color="primary"
                        href="https://github.com/yourprofile"
                        target="_blank"
                        size="large"
                      >
                        <i
                          className="fab fa-github"
                          style={{ fontSize: "1.5rem" }}
                        />
                      </IconButton>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.1 }}>
                      <IconButton
                        color="primary"
                        href="https://twitter.com/yourprofile"
                        target="_blank"
                        size="large"
                      >
                        <i
                          className="fab fa-twitter"
                          style={{ fontSize: "1.5rem" }}
                        />
                      </IconButton>
                    </motion.div>
                  </Stack>
                </Grid>
              </Grid>

              <Box sx={{ mt: 6 }}>
                <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
                  Leave a Comment
                </Typography>
                <form onSubmit={handleSubmit}>
                  <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
                    <TextField
                      fullWidth
                      label="Your message..."
                      variant="outlined"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      multiline
                      rows={3}
                    />
                    <motion.div whileHover={{ scale: 1.05 }}>
                      <Button
                        variant="contained"
                        type="submit"
                        sx={{ height: "100%" }}
                      >
                        Send
                      </Button>
                    </motion.div>
                  </Box>
                </form>
                <Box sx={{ maxHeight: 200, overflowY: "auto", mb: 2 }}>
                  {renderComments}
                </Box>
                <Typography variant="body2" color="text.secondary">
                  {`${coms.length} comments`}
                </Typography>
                <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                  The comments above are submitted and fetched from MongoDB with
                  an API that I built myself using Node and Express.js.
                </Typography>
              </Box>
            </Paper>
          </Fade>
        </Container>
      </Section>

      <ScrollToTop>
        <Fab color="secondary" size="medium" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollToTop>
    </Box>
  );
};

// ModeToggle Component
const ModeToggle = () => {
  const colorMode = useContext(ColorModeContext);
  const theme = useTheme();

  return (
    <motion.div whileHover={{ scale: 1.1 }}>
      <IconButton
        sx={{ ml: 1 }}
        onClick={colorMode.toggleColorMode}
        color="inherit"
      >
        {theme.palette.mode === "dark" ? (
          <Brightness7Icon />
        ) : (
          <Brightness4Icon />
        )}
      </IconButton>
    </motion.div>
  );
};

// Main App component to manage theme state
const App = () => {
  const [mode, setMode] = useState("dark");
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
      mode,
    }),
    [mode]
  );

  const theme = useMemo(() => {
    let newTheme = createTheme({
      palette: {
        mode,
        primary: {
          main: mode === "dark" ? "#90caf9" : "#1976d2",
        },
        secondary: {
          main: "#FFD700",
        },
        background: {
          default: mode === "dark" ? "#121212" : "#f5f5f5",
          paper: mode === "dark" ? "#1E1E1E" : "#ffffff",
        },
      },
      typography: {
        fontFamily: '"Poppins", "Helvetica", "Arial", sans-serif',
        h1: {
          fontWeight: 700,
          fontSize: "4rem",
          lineHeight: 1.2,
        },
        h2: {
          fontWeight: 700,
          fontSize: "3rem",
        },
        h3: {
          fontWeight: 600,
          fontSize: "2.5rem",
        },
        h5: {
          fontWeight: 400,
          fontSize: "1.5rem",
        },
        body1: {
          fontSize: "1.1rem",
        },
      },
      components: {
        MuiButton: {
          styleOverrides: {
            root: {
              borderRadius: "8px",
              textTransform: "none",
              fontWeight: 500,
              padding: "8px 24px",
            },
          },
        },
        MuiPaper: {
          styleOverrides: {
            root: {
              transition: "all 0.3s ease",
            },
          },
        },
        MuiCssBaseline: {
          styleOverrides: `
            body {
              overflow-x: hidden;
            }
            /* For Webkit-based browsers (Chrome, Safari) */
            ::-webkit-scrollbar {
              display: none;
            }
            /* For IE, Edge and Firefox */
            body {
              -ms-overflow-style: none;  /* IE and Edge */
              scrollbar-width: none;  /* Firefox */
            }
          `,
        },
      },
    });
    newTheme = responsiveFontSizes(newTheme);
    return newTheme;
  }, [mode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Home />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

// Comments
const Comment = (props) => {
  const { comment } = props.comment;
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Paper
        elevation={1}
        sx={{ p: 2, mb: 2, backgroundColor: "background.paper" }}
      >
        <Typography variant="body2">{comment}</Typography>
      </Paper>
    </motion.div>
  );
};

export default App;
