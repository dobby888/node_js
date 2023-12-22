const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const Sequelize = require('sequelize');
const axios = require('axios');

const Op = Sequelize.Op;

const errorController = require('./controllers/error');

const sequelize = require('./util/database');


const Slot = require('./models/slots.js');
const MeetingDetails = require('./models/meetingDetails.js');
// const Admin = require('./models/admin.js');
// const Login = require('./models/login.js');

// Create associations
Slot.hasMany(MeetingDetails, { foreignKey: 'slotId', as: 'meetingDetails', onDelete: 'CASCADE' });
MeetingDetails.belongsTo(Slot, { foreignKey: 'slotId', as: 'slot' });
// Admin.hasMany(Slot, { onDelete: 'CASCADE', as: 'slots' });
// Admin.hasOne(Login);
// Login.belongsTo(Admin);

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// app.use((req, res, next) => {
//   Admin.findByPk(1)
//     .then(admin => {
//       req.admin = admin;
//       next();
//     })
//     .catch(err => console.log(err));
// });

// Routes and Controllers

// Get add slots page
app.get('/add_slots', (req, res) => {
  res.sendFile('add_slots.html', { root: 'views' });
});

// Add slots
app.post('/add_slots', async (req, res) => {
  const { date, startTime, endTime, noOfSlots } = req.body;

  try {
    const slot = await Slot.create({
      date: date,
      startTime: startTime,
      endTime: endTime,
      noOfSlots: noOfSlots,
    });

    console.log('Slot created:', slot);
    res.redirect('/slots');
  } catch (err) {
    console.error('Error creating slot:', err);
    res.status(500).send('Error creating slot');
  }
});

// Get slots
app.get('/slots', async (req, res) => {
  try {
    const slots = await Slot.findAll();
    let html = '<h1>Slots:</h1>';
    html += '<a href=/add_slots>Add Slots</a>';

    for (const slot of slots) {
      const meetingDetails = await MeetingDetails.findAll({
        where: { slotId: slot.id },
      });

      html += `
        <div>
            <p>Date: ${slot.date}</p>
            <p>Time: ${slot.startTime} to ${slot.endTime}</p>
            <p>No. Of Slots Available: ${slot.noOfSlots}</p>
            <a href="/meeting_details/${slot.id}">Book Meeting</a>
            <button onclick="cancelSlot('${slot.id}')">Cancel Slot</button>
        </div>
      `;

      // Check if 'meetingDetails' is not undefined before using forEach
      if (meetingDetails && meetingDetails.length > 0) {
        html += '<h1>Meetings:</h1>';
        meetingDetails.forEach((meetingDetail) => {
          html += `
            <p>Hi ${meetingDetail.name}, your meeting is booked on ${meetingDetail.date} at ${meetingDetail.startTime}. Please join the meeting through the link:https://zoom.us/j/5551112222.</p>
            <button onclick="cancelMeeting('${meetingDetail.id}')">Cancel Meeting</button>
          `;
        });
      }
    }

    html += `
  <script>
    function cancelMeeting(meetingId) {
      // Add logic to cancel the meeting, update UI, and make a server request using Axios
      axios.post("/cancel_meeting/${meetingId}")
        .then(response => {
          console.log('Meeting canceled:', response.data);
          // Update UI as needed
        })
        .catch(error => console.error('Error canceling meeting:', error));
    }

    function cancelSlot(slotId) {
      // Add logic to cancel the slot, update UI, and make a server request using Axios
      axios.post("/cancel_slot/${slotId}")
        .then(response => {
          console.log('Slot canceled:', response.data);
          // Update UI as needed
        })
        .catch(error => console.error('Error canceling slot:', error));
    }
  </script>
`;

res.send(html);


    res.send(html);
  } catch (err) {
    console.error('Error retrieving slots:', err);
    res.status(500).send('Error retrieving slots');
  }
});

// Get meeting details page
app.get('/meeting_details/:slotId', (req, res) => {
  const slotId = req.params.slotId;
  res.send(`
    <form action="/meeting_details" method="POST">
      <input type="hidden" name="slotId" value="${slotId}">
      <label for="name">Name:</label>
      <input type="text" id="name" name="name" placeholder="Enter your Name....." required><br>
      <label for="email">Email:</label>
      <input type="email" id="email" name="email" placeholder="Enter your EmailId....." required><br>
      <button type="submit" style="background-color: skyblue;">Book</button>
    </form>
  `);
});

// Post meeting details
app.post('/meeting_details', async (req, res) => {
  const { name, email, slotId, startTime, endTime } = req.body;

  try {
    const meetingDetail = await MeetingDetails.create({
      name: name,
      email: email,
      slotId: slotId,
      startTime: startTime,
      endTime: endTime,
      date: new Date(),
    });

    console.log('Meeting detail created:', meetingDetail);

    // Update the number of slots available in the associated slot
    const slot = await Slot.findByPk(slotId);
    if (slot) {
      slot.noOfSlots -= 1;
      await slot.save();
    }

    res.redirect('/slots');
  } catch (err) {
    console.error('Error creating meeting detail:', err);
    res.status(500).send('Error creating meeting detail');
  }
});

// Cancel meeting
app.post('/cancel_meeting/:meetingId', async (req, res) => {
  const meetingId = req.params.meetingId;

  try {
    const meetingDetail = await MeetingDetails.findByPk(meetingId);
    if (meetingDetail) {
      // Use Sequelize destroy() method to delete the meeting
      await meetingDetail.destroy();

      // Update the number of slots available in the associated slot
      const slot = await Slot.findByPk(meetingDetail.slotId);
      if (slot) {
        slot.noOfSlots += 1; // Increment the number of slots
        await slot.save();
      }

      res.redirect('/slots'); // Redirect to the slots page or wherever you want after cancellation
    } else {
      res.status(404).send('Meeting not found');
    }
  } catch (err) {
    console.error('Error canceling meeting:', err);
    res.status(500).send('Error canceling meeting');
  }
});

// Cancel slot
app.post('/cancel_slot/:slotId', async (req, res) => {
  const slotId = req.params.slotId;

  try {
    const slot = await Slot.findByPk(slotId);
    if (slot) {
      // Delete associated meeting details before deleting the slot
      await MeetingDetails.destroy({
        where: { slotId: slot.id },
      });

      // Use Sequelize destroy() method to delete the slot
      await slot.destroy();

      res.redirect('/slots'); // Redirect to the slots page or wherever you want after cancellation
    } else {
      res.status(404).send('Slot not found');
    }
  } catch (err) {
    console.error('Error canceling slot:', err);
    res.status(500).send('Error canceling slot');
  }
});

// 404 Page
app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

sequelize
  .sync()
  // .then(result => {
  //   return Admin.findByPk(1);
  // })
  // .then(admin => {
  //   if (!admin) {
  //     return Admin.create({ name: 'sree', email: 'sree@gmail.com' });
  //   }
  //   return admin;
  // })
  // .then(admin => {
  //   return admin.createLogin();
  // })
  .then(login => {
    app.listen(8000);
  })
  .catch(err => {
    console.log(err);
  });
