const express = require('express');
const router = express.Router();
const CalendarEvents = require('../Models/CalenderModel');

// Create an event (POST request)
router.post('/event', async (req, res) => {
    const { title, description, start, end, createdBy } = req.body;
    try {
        const event = await CalendarEvents.create({title, description, start, end, CreatedBy: createdBy });
        res.status(201).json(event);
    } catch (error) {
        res.status(500).json({ error });
    }
});

// Get all events (GET request)
router.get('/events', async (req, res) => {
    try {
        const events = await CalendarEvents.findAll();
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ error: 'Error retrieving events.' });
    }
});

// Get a specific event by ID (GET request)
router.get('/events/:id', async (req, res) => {
    const eventId = req.params.id;

    try {
        const event = await CalendarEvents.findByPk(eventId);
        if (!event) {
            return res.status(404).json({ message: 'Event not found.' });
        }
        res.status(200).json(event);
    } catch (error) {
        res.status(500).json({ error: 'Error retrieving the event.' });
    }
});

// Update an event by ID (PUT request)
router.put('/events/:id', async (req, res) => {
    const eventId = req.params.id;

    try {
        const event = await CalendarEvents.findByPk(eventId);
        if (!event) {
            return res.status(404).json({ message: 'Event not found.' });
        }

        const { title, description, start, end, CreatedBy } = req.body;
        await event.update({ title, description, start, end, CreatedBy });

        res.status(200).json(event);
    } catch (error) {
        res.status(500).json({ error: 'Error updating the event.' });
    }
});

// Delete an event by ID (DELETE request)
router.delete('/events/:id', async (req, res) => {
    const eventId = req.params.id;

    try {
        const event = await CalendarEvents.findByPk(eventId);
        if (!event) {
            return res.status(404).json({ message: 'Event not found.' });
        }

        await event.destroy();
        res.status(200).json({ message: 'Event deleted successfully.' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting the event.' });
    }
});

// Create multiple events (POST request)
router.post('/events', async (req, res) => {
    const eventsData = req.body;
    try {
        const events = await CalendarEvents.bulkCreate(eventsData, { validate: true }); // Set validate to true to enforce validation on fields
        res.status(201).json(events);
    } catch (error) {
        res.status(500).json({ error });
    }
});

module.exports = router;
