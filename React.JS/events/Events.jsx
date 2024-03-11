import React, { useState } from "react";
import { useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import debug from "sabio-debug";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import eventService from "services/eventService";
import EventCard from "./EventCard";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";
import { Formik, Form, Field } from "formik";
import PropTypes from "prop-types";

const _logger = debug.extend("Events");

function Events({ currentUser }) {
  const [event, setEvent] = useState({
    arrayOfEvents: [],
    eventsComponents: [],
    pageIndex: 0,
    pageSize: 6,
    totalCount: 0,
  });

  const [query, setQuery] = useState("");

  const navigate = useNavigate();

  const toastrSetting = {
    position: toast.POSITION.TOP_RIGHT,
  };

  useEffect(() => {
    if (query === "") {
      eventService
        .getEvent(event.pageIndex, event.pageSize)
        .then(onGetEvtSuccess)
        .catch(onGetEvtError);
    } else {
      eventService
        .getQuery(event.pageIndex, event.pageSize, query)
        .then(onGetQuerySuccess)
        .catch(onGetQueryError);
    }
  }, [event.pageIndex, query]);

  const onGetQuerySuccess = (data) => {
    _logger("onGetQuerySuccess", data);

    let arrayOfEvents = data.item.pagedItems;
    _logger({ arrayOfEvents });

    setEvent((prevState) => {
      const pd = { ...prevState };
      pd.arrayOfEvents = arrayOfEvents;
      pd.eventsComponents = arrayOfEvents.map(mapEvents);
      pd.pageIndex = data.item.pageIndex;
      pd.pageSize = data.item.pageSize;
      pd.totalCount = data.item.totalCount;
      pd.query = data.item.query;
      return pd;
    });
  };

  const onGetQueryError = (error) => {
    _logger("onGetQueryError", error);
    toast.error(`"No event found with the search: ${query}`, {
      toastrSetting,
    });

    setQuery("");
  };

  const onGetEvtSuccess = (data) => {
    _logger("onGetEvtSuccess", data);

    let arrayOfEvents = data.item.pagedItems;
    _logger({ arrayOfEvents });

    setEvent((prevState) => {
      const pd = { ...prevState };
      pd.arrayOfEvents = arrayOfEvents;
      pd.eventsComponents = arrayOfEvents.map(mapEvents);
      pd.pageIndex = data.item.pageIndex;
      pd.pageSize = data.item.pageSize;
      pd.totalCount = data.item.totalCount;
      return pd;
    });
  };

  const onGetEvtError = (error) => {
    _logger("onGetEvtError", error);
    toast.error("Error Getting Events", {
      toastrSetting,
    });
  };

  const mapEvents = (anEvent) => {
    _logger("aEvent", anEvent);
    return (
      <EventCard
        key={"ListA-" + anEvent.id}
        anEvtProp={anEvent}
        onEvtClicked={onEventClicked}
        onDelete={onDeleteReq}
        onUpdate={onUpdateReq}
        userRole={currentUser.role}
      />
    );
  };

  const onDeleteReq = useCallback((event, evtObj) => {
    _logger("evtObj", evtObj);
    _logger("Deleted", event.id, { event, evtObj });

    const handler = getDeleteSuccess(event.id);

    eventService.deleteEvent(event.id).then(handler).catch(onDeleteEventError);
  });

  const getDeleteSuccess = (idToDelete) => {
    return () => {
      _logger("Id Deleted", idToDelete);
      setEvent((prevState) => {
        const pd = { ...prevState };

        pd.arrayOfEvents = [...pd.arrayOfEvents];

        const idxOf = pd.arrayOfEvents.findIndex((evt) => {
          let result = false;
          if (evt.id === idToDelete) {
            result = true;
          }
          return result;
        });
        if (idxOf >= 0) {
          pd.arrayOfEvents.splice(idxOf, 1);
          pd.eventsComponents = pd.arrayOfEvents.map(mapEvents);
        }
        return pd;
      });
    };
  };

  const onDeleteEventError = (error) => {
    _logger("onDeleteEvtError", error);
    toast.error("Error Deleting Event", {
      toastrSetting,
    });
  };

  const onUpdateReq = useCallback((anEvt, e) => {
    _logger(anEvt.id, { anEvt, e });
    const pageTransfer = { type: "MY_EVT", payload: anEvt };
    navigate(`/events/edit/${anEvt.id}`, { state: pageTransfer });
  }, []);

  const onEventClicked = useCallback((anEvt, e) => {
    _logger(anEvt.id, { anEvt, e });
    const pageTransfer = { type: "MY_EVT", payload: anEvt };
    navigate(`/events/view/${anEvt.id}`, { state: pageTransfer });
  }, []);

  const nextPage = (page) => {
    setEvent((prevState) => {
      const newPage = { ...prevState };
      newPage.pageIndex = page - 1;
      return newPage;
    });
  };

  const handleChange = (e) => {
    _logger("search", e.target.value);

    var searchValue = e.target.value;
    setQuery(searchValue);
  };

  return (
    <>
      <h1>Events</h1>
      <Formik>
        <Form id="searchQuery mt-2">
          <div className="form-group">
            <Field
              type="text"
              id="searchInput"
              name="query"
              className="search-container rounded-input"
              onChange={handleChange}
              value={query}
              style={{ borderRadius: "100px" }}
              placeholder="Search.."
            />
          </div>
        </Form>
      </Formik>

      <div className="container">
        <div
          className="row"
          style={{
            gap: "60px",
          }}
        >
          {event.eventsComponents}{" "}
        </div>
        <ToastContainer />
        <div className="col">
          <Pagination
            className="justify-content-center d-flex"
            onChange={nextPage}
            current={event.pageIndex + 1}
            pageSize={event.pageSize}
            total={event.totalCount}
          />
        </div>
      </div>
    </>
  );
}

Events.propTypes = {
  currentUser: PropTypes.shape({
    role: PropTypes.string,
  }),
};

export default Events;
