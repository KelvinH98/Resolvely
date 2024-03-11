import React, { useState } from "react";
import { useEffect } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import lookUpService from "services/lookUpService";
import debug from "sabio-debug";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { mapLookUpItem } from "../../helpers/utils";
import eventService from "services/eventService";
import FileUpload from "components/Files/FileUpload";
import eventSchema from "../../schemas/eventSchema";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useLocation } from "react-router-dom";

const _logger = debug.extend("EventFormDebug");

function EventForm() {
  const [eventData, setEventData] = useState({
    eventTypeId: "",
    name: "",
    summary: "",
    shortDescription: "",
    venueId: "",
    eventStatusId: "",
    imageUrl: "",
    externalSiteUrl: "",
    isFree: false,
    dateStart: "",
    dateEnd: "",
  });

  const [lookUps, setLookUp] = useState({
    eventsTypes: [],
    mappedEvtTypes: [],
    eventStatus: [],
    mappedEvtStatus: [],
  });

  const location = useLocation();
  _logger("location", location);
  useEffect(() => {
    lookUpService
      .lookUp(["EventTypes", "EventStatus"])
      .then(onLookUpSuccess)
      .catch(onGetLookUpError);

    //you need to use the useLocation hook,

    //in this use effect create an if statement, if location.state has data then your default eventData state
    //has to be updated with all of the data of that event

    if (location.state?.type === "MY_EVT" && location.state?.payload) {
      setEventData((prevState) => {
        const input = { ...prevState, ...location.state.payload };
        input.eventTypeId = location.state.payload.eventTypeId;
        input.name = location.state.payload.name;
        input.summary = location.state.payload.summary;
        input.shortDescription = location.state.payload.shortDescription;
        input.venueId = location.state.payload.venue;
        input.eventStatusId = location.state.payload.eventStatus;
        input.imageUrl = location.state.payload.imageUrl;
        input.externalSiteUrl = location.state.payload.externalSiteUrl;
        input.isFree = location.state.payload.isFree;
        input.dateStart = location.state.payload.dateStart;
        input.dateEnd = location.state.payload.dateEnd;
        return input;
      });
    }
  }, [location]);

  const onLookUpSuccess = (data) => {
    const { eventTypes, eventStatus } = data.item;
    setLookUp((prevState) => {
      let newState = { ...prevState };
      newState.eventsTypes = eventTypes;
      newState.mappedEvtTypes = eventTypes.map(mapLookUpItem);
      newState.eventStatus = eventStatus;
      newState.mappedEvtStatus = eventStatus.map(mapLookUpItem);
      return newState;
    });
  };

  const toastrSetting = {
    position: toast.POSITION.TOP_RIGHT,
  };

  const onGetLookUpError = (err) => {
    _logger("onGetLookUpError", err);
    toast.error("Error getting lookup", {
      toastrSetting,
    });
  };

  const uploadComplete = (response, setFieldValue) => {
    _logger("fileUploaded", response);
    setFieldValue("imageUrl", response.items[0].url);
    toast.success("Image uploaded successfully!", {
      toastrSetting,
    });
  };

  const onSubmitHandle = (values) => {
    _logger("onSubmitHandle is firing.", values);
    if (values.id) {
      eventService
        .updateEvent(values, values.id)
        .then(onUpdateEventSuccess)
        .catch(onUpdateEventError);
    } else {
      eventService
        .addEvent(values)
        .then(onAddEventSuccess)
        .catch(onAddEventError);
    }
  };

  const onAddEventSuccess = (response) => {
    _logger("Successfully added a event:", response);
    toast.success("Event Created Successfully", {
      toastrSetting,
    });

    setEventData((prevState) => {
      let newEventData = { ...prevState };
      newEventData.id = response.item;
      return newEventData;
    });
  };

  const onAddEventError = (response) => {
    _logger("There was a problem adding a event:", response);
    toast.error("Error Adding a New Event.", {
      toastrSetting,
    });
  };

  const onUpdateEventSuccess = (response) => {
    _logger("Successfully updated a event:", response);
    toast.success("Event Updated Successfully", {
      toastrSetting,
    });
  };

  const onUpdateEventError = (response) => {
    _logger("There was a problem updating a event:", response);
    toast.error("Error Updating the Event.", {
      toastrSetting,
    });
  };

  const updateCharCount = (data) => {
    const tempDiv = document.createElement("div");
    tempDiv.dangerouslySetInnerHTML = data;
    return tempDiv.textContent || tempDiv.innerText || "";
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <h2>Create Event</h2>
            <ToastContainer />
            <Formik
              enableReinitialize={true}
              initialValues={eventData}
              onSubmit={onSubmitHandle}
              validationSchema={eventSchema}
            >
              {({ values, setFieldValue }) => (
                <Form id="createEvent mt-2" className="card p-2 bg-light">
                  {_logger(values)}
                  <div className="form-group">
                    <label htmlFor="eventTypeId" className="form-label">
                      Event Type
                    </label>
                    <Field
                      component="select"
                      name="eventTypeId"
                      className="form-control"
                    >
                      <option>Please Select event Type</option>
                      {lookUps.mappedEvtTypes}
                    </Field>
                    <ErrorMessage
                      name="EventTypeId"
                      component="div"
                      className="has-error"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="name" className="form-label">
                      Name
                    </label>
                    <Field
                      type="text"
                      name="name"
                      id="name"
                      className="form-control"
                    />
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="has-error"
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="summary" className="form-label">
                      Summary
                    </label>
                    <CKEditor
                      name="content"
                      editor={ClassicEditor}
                      config={{ placeholder: "Hello, this is my content!" }}
                      data={values.summary}
                      dangerouslySetInnerHTML={{ __html: values.content }}
                      onReady={(editor) => {
                        _logger("Editor is ready to use!", editor);
                      }}
                      onChange={(event, editor) => {
                        const data = editor.getData();
                        setFieldValue("summary", data);
                        updateCharCount(data);
                      }}
                    />
                    <ErrorMessage
                      name="summary"
                      component="div"
                      className="has-error"
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="shortDescription" className="form-label">
                      Short Description
                    </label>
                    <CKEditor
                      name="content"
                      editor={ClassicEditor}
                      config={{ placeholder: "Hello, this is my content!" }}
                      data={values.shortDescription}
                      dangerouslySetInnerHTML={{ __html: values.content }}
                      onReady={(editor) => {
                        _logger("Editor is ready to use!", editor);
                      }}
                      onChange={(event, editor) => {
                        const data = editor.getData();
                        setFieldValue("shortDescription", data);
                        updateCharCount(data);
                      }}
                    />
                    <ErrorMessage
                      name="shortDescription"
                      component="div"
                      className="has-error"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="venueId" className="form-label">
                      Venue
                    </label>
                    <Field
                      type="text"
                      name="venueId"
                      id="venueId"
                      className="form-control"
                    />
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="has-error"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="eventStatusId" className="form-label">
                      Event Status
                    </label>
                    <Field
                      component="select"
                      name="eventStatusId"
                      className="form-control"
                    >
                      <option>Please Select event Type</option>
                      {lookUps.mappedEvtStatus}
                    </Field>
                    <ErrorMessage
                      name="eventStatusId"
                      component="div"
                      className="has-error"
                    />
                  </div>

                  <div className="mb-3">
                    <label>Image Url</label>
                    <FileUpload
                      name="imageUrl"
                      uploadComplete={(response) =>
                        uploadComplete(response, setFieldValue)
                      }
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="externalSiteUrl" className="form-label">
                      External Site Url
                    </label>
                    <Field
                      type="text"
                      name="externalSiteUrl"
                      id="externalSiteUrl"
                      className="form-control"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="dateStart" className="form-label">
                      Date Start: yyyy-mm-dd
                    </label>
                    <Field
                      type="text"
                      name="dateStart"
                      id="dateStart"
                      className="form-control"
                    />
                    <ErrorMessage
                      name="dateStart"
                      component="div"
                      className="has-error"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="dateEnd" className="form-label">
                      Date End: yyyy-mm-dd
                    </label>
                    <Field
                      type="text"
                      name="dateEnd"
                      id="dateEnd"
                      className="form-control"
                    />
                    <ErrorMessage
                      name="dateEnd"
                      component="div"
                      className="has-error"
                    />
                  </div>

                  <div className="form-check form-switch">
                    <Field
                      type="checkbox"
                      role="switch"
                      className="form-check-input"
                      name="isFree"
                    />
                    <label htmlFor="isFree" className="form-check-label">
                      isFree
                    </label>
                  </div>

                  <button
                    type="submit"
                    id="add"
                    className="btn btn-primary col-3 mt-2"
                  >
                    Submit
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
}

export default EventForm;
