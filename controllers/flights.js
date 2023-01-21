const Flight = require('../models/flight');
const Ticket = require('../models/ticket');


module.exports = {
    index,
    new: newFlight,
    create,
    show
}

function index(req, res) {
    Flight.find({}, function(err, flight) {
        res.render('flights/index', {flight} );
    });
    
};

function newFlight(req, res) {
    res.render('flights/new');
};

function create(req, res) {
    const flight = new Flight(req.body);

    flight.save(function(err) {
        if (err) return res.redirect('/flights/new')
        console.log(flight);
        res.redirect('/flights/');
    });
};

function show(req, res) {
    Flight.findOne({ _id: req.params.id }, function (err, flight) {
      Ticket.find({ flight: flight._id }, function (err, ticket) {
        res.render("flights/show", { flight, ticket });
      });
    });
  }