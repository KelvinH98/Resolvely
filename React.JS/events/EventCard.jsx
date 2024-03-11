import React from "react";
import debug from "sabio-debug";
import PropTypes from "prop-types";
import SubtleBadge from "components/common/SubtleBadge";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import {
  CardBody,
  CardImg,
  CardText,
  Card,
  CardTitle,
  ButtonGroup,
} from "react-bootstrap";

const _logger = debug.extend("EventCard");

function EventCard(props) {
  const anEvent = props.anEvtProp;

  _logger("anEvent", anEvent);

  const onEvtClick = (e) => {
    _logger("EvtClicked");
    e.preventDefault();
    props.onEvtClicked(anEvent, e);
  };

  const onDeleteClick = (evt) => {
    _logger("Delete Clicked");
    evt.stopPropagation();
    props.onDelete(anEvent, evt);
  };

  const onEditClick = (evt) => {
    _logger("Edit Clicked", evt);
    evt.stopPropagation();
    props.onUpdate(anEvent, evt);
  };

  return (
    <>
      <div className="col-md-3 p-3">
        <Card onClick={onEvtClick} style={{ width: "20rem" }}>
          <CardImg
            src={anEvent.imageUrl}
            variant="top"
            style={{ width: "20", height: "10vw", objectFit: "fit" }}
          />
          <CardBody>
            <CardTitle as="h5">{anEvent.name}</CardTitle>
            <SubtleBadge pill bg="primary" className="me-2">
              {anEvent.eventType.name}
            </SubtleBadge>
            <CardText
              className="text-capitalize flex"
              dangerouslySetInnerHTML={{
                __html: `${anEvent.shortDescription.slice(0, 50)}...See More!`,
              }}
            ></CardText>
            {props.userRole === "Admin" && (
              <ButtonGroup className="float-end">
                <button
                  onClick={onEditClick}
                  type="btn"
                  className="btn btn-primary"
                >
                  <FontAwesomeIcon icon={faEdit} />
                </button>
                <button
                  type="btn"
                  className="btn btn-danger"
                  onClick={onDeleteClick}
                >
                  <FontAwesomeIcon icon={faTrash} shake />
                </button>
              </ButtonGroup>
            )}
          </CardBody>
        </Card>
      </div>
    </>
  );
}

EventCard.propTypes = {
  anEvtProp: PropTypes.shape({
    eventType: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    summary: PropTypes.string.isRequired,
    shortDescription: PropTypes.string.isRequired,
    venueId: PropTypes.number.isRequired,
    eventStatusId: PropTypes.number.isRequired,
    imageUrl: PropTypes.string,
    externalSiteUrl: PropTypes.string,
    isFree: PropTypes.bool,
  }),
  onEvtClicked: PropTypes.func,
  onDelete: PropTypes.func,
  onUpdate: PropTypes.func,
  userRole: PropTypes.func,
};

export default EventCard;
