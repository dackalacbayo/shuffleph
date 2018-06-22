import React, { Component } from "react";
import Link from "gatsby-link";
import axios from "axios";
import MenuItem from "../components/Menuitem";
import Header from "../components/Header";
import { LocalForm, Control, Errors } from "react-redux-form";
import { Col,Button,Form,FormGroup,Label,Input,FormText } from "reactstrap";

import Workshop from "../workshop.png";
import FGD from "../fgd.png";
import Theater from "../theater.png";
import Launch from "../launch.png";
import Party from "../party.png";
import Screening from "../screening.png";

import "../layouts/style.css";
import {email,Basic,Time,Num,date,Radio,TextArea,File} from "../components/FormInputs";

const menu = [
  {
    title: "MAKER-\nSPACE",
    styles: "bg-bl tx-gr",
    path: "/makerspace",
    isActive: true
  },
  {
    title: "ABOUT SHUFFLE",
    styles: "bg-og tx-ma",
    path: "/about",
    isActive: false
  },
  {
    title: "UPCOMING EVENTS",
    styles: "bg-gr tx-bl",
    path: "/events",
    isActive: false
  },

  {
    title: "CO-WORKING SPACE",
    styles: "bg-ma tx-og",
    path: "/coworking",
    isActive: false
  }
];

const layoutopts = [
  {
    title: "Workshop",
    src: Workshop,
    desc: "Workshop Tables (8)",
    subdesc: "Stools (20)"
  },
  { title: "FGD", src: FGD, desc: "Round Tables (6)", subdesc: "Stools (24)" },
  {
    title: "Party",
    src: Party,
    desc: "Square Tables (6)",
    subdesc: "Stools (24)"
  },
  {
    title: "Screening",
    src: Screening,
    desc: "Long Tables (4)",
    subdesc: "Chairs (20)"
  },
  { title: "Launch", src: Launch, desc: "Long Tables (4)" },
  { title: "Theater", src: Theater, subdesc: "Chairs (30)" }
];

// validators
const isPast = val => {
  var date = new Date(val);
  var now = new Date();
  if (now > date) console.log("past");
  else return true;
};

const MakerForm = ({ children }) => <div>{children}</div>;

const FormSection = ({ subtitle, children }) => (
  <div>
    <h4 className="tx-ma all-caps"> {subtitle} </h4>
    {children}
  </div>
);

const info = [
  { name: "name", placeholder: "Juan" },
  { name: "phone", placeholder: "+639178905643" },
  { name: "email", placeholder: "hello@shuffle.ph" }
];

const InfoSection = () => (
  <FormSection subtitle="info">
    {info.map(row => (
      <FormGroup row>
        <Label for="exampleEmail" sm={2}>
          {row.name}
        </Label>
        <Col sm={10}>
          <Input key={row.name} {...row} required />
        </Col>
      </FormGroup>
    ))}
  </FormSection>
);

const EventSec = () => (
  <FormSection subtitle="event">
    <FormGroup row>
      <Label for="exampleEmail" sm={2}>
        date
      </Label>
      <Col sm={10}>
        <Input type="date" name="date" required />
      </Col>
    </FormGroup>
    <FormGroup row>
      <Label for="exampleEmail" sm={2}>
        time
      </Label>
      <Col sm={5}>
        <Input type="time" name="timeStart" required />
      </Col>
      <Label for="exampleEmail" sm={1}>
        to
      </Label>
      <Col sm={4}>
        <Input type="time" name="timeEnd" required />
      </Col>
    </FormGroup>
    <FormGroup row>
      <Label for="exampleEmail" sm={2}>
        no. of people
      </Label>
      <Col sm={10}>
        <Input type="number" name="pax" placeholder="10" required />
      </Col>
    </FormGroup>
    <FormGroup row>
      <Label for="exampleEmail" sm={2}>
        type of event
      </Label>
      <Col sm={10}>
        <Input type="text" name="type" placeholder="Yoga Class" required />
      </Col>
    </FormGroup>
  </FormSection>
);

const Layout = () => (
  <FormSection subtitle="Layout">
    <h4 className="instrc italic">
      {" "}
      Select type of package or shuffle the space{" "}
    </h4>
    <FormGroup className="form-mrg" check row>
      {layoutopts.map(opt => (
        <Label className="text-mobile-align" sm={6} check>
          <Input type="radio" name="setup" value={opt.title} required /> THE{" "}
          <span className="h4 bold">{opt.title}</span>
          <div className="ms-options">
            <img src={opt.src} />
            <p> {opt.desc} </p>
            <p> {opt.subdesc} </p>
          </div>
        </Label>
      ))}
    </FormGroup>
    <FormGroup className="text-mobile-align" check row>
      <Label sm={12} checked>
        <Input type="radio" name="setup" value="custom" required/> THE{" "}
        <span className="h4 bold">Shuffle</span>
      </Label>
      <Col sm={12}>
        upload an image of your preferred layout <br />
        <br />
        <Input type="file" name="file" />
      </Col>
    </FormGroup>
  </FormSection>
);

const Extras = () => (
  <FormSection subtitle="Extras">
    <FormGroup check row>
      <Label sm={12} check>
        <Input type="radio" name="addOns" value="food (10 pax)" /> food
        (good for 10) - 2500
      </Label>
    </FormGroup>
    <FormGroup row>
      <Label for="exampleEmail" sm={4}>
        other requests
      </Label>
      <Col sm={8}>
        <Input type="textarea" name="notes" />
      </Col>
    </FormGroup>
  </FormSection>
);

const options = [
  { title: 'whole day (10 hrs)', time: '8 hours', price_1: '8,500', price_2:'9,500'},
  { title: 'half day (4 hrs)', time: '4 hours', price_1: '5,000', price_2:'6,000'},
  { title: 'pit stop (1hr)', time: '1 hour', price_1: '1,500', price_2:'2,000'},

]

function renderOptions(opts){
  return opts.map((opt) => {
    return (
      <FormGroup className="">
        <Label className="row" >
          <Col xs={{size:5}}>
              <Input type="radio" name="passtype" value={opt.title} required />
            {opt.title}
          </Col>
          <Col xs={{size: 3}}>
            <p>{opt.price_1}</p>
          </Col>
          <Col xs={{size: 4}}>
            <p>P {opt.price_2}</p>
          </Col>
        </Label>
      </FormGroup>
    )
  })
}

const PassType = () => (
  <FormGroup className="renderOptions mb-4">
    <Label className="row" style={{marginLeft:'-45px'}} >
      <Col xs={5}>
      <strong>No. of Hours</strong>
      </Col>
      <Col className="ml-2" xs={{size: 3, offset:0}}>
        <strong>Weekday</strong>
      </Col>
      <Col xs={{size: 3}}>
        <strong>Weekend</strong>
      </Col>
    </Label>
      {renderOptions(options)}
    </FormGroup>
)

var is_weekend = function(date1) {
  var dt = new Date(date1);
  console.log(dt.getDay());
  if (dt.getDay() == 6 || dt.getDay() == 0) return true;

  return false;
};

const apiUrl =
  "https://9su5wlor3c.execute-api.ap-southeast-1.amazonaws.com/latest";

const encode = data => {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
};

class MakerSpacePage extends Component {
  handleChange(values) {
    console.log(values);
  }
  handleUpdate(form) {
    console.log(form);
  }

  handleSubmit = values => {
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode(values, { "form-name": "contact" })
    })
      .then(() => alert("Success!"))
      .catch(error => alert(error));

    // e.preventDefault();
  };

  handleSubmitFailed(userForm) {
    // logs form-level errors
    console.log(userForm.$form.errors);

    // logs errors for user.email
    console.log(userForm.email.errors);
  }
  render() {
    return (
      <div>
        <Header />
        <div className="flex-wrap row-eq-height">
          <div className="col-md-6 content-body form-container mtop">
          <h3 className="title-head tx-ma no-pad"> Book our Makerspace </h3>
            <form
              name="makerspaceDetails"
              method="POST"
              data-netlify="true"
              action="/thanks/"
              data-netlify-honeypot="bot-field"
            >
              <input type="hidden" name="form-name" value="makerspaceDetails" />
              <InfoSection />
              <EventSec />
              <PassType />
              <Layout />
              <Extras />
              <Button className="bg-ma tx-og" block>
                Submit
              </Button>
            </form>
          </div>
          <div className="col-md-6 no-pad">
            <div className="d-flex flex-column">
              {menu.map(item => (
                <MenuItem
                  title={item.title}
                  styles={item.styles}
                  path={item.path}
                  isActive={item.isActive}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MakerSpacePage;
