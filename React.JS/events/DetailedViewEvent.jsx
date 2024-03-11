import React from "react";
import debug from "sabio-debug";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
import Flex from "components/common/Flex";
import SubtleBadge from "components/common/SubtleBadge";
import IconButton from "components/common/IconButton";

const _logger = debug.extend("DetailedEvt");

function DetailedViewEvent() {
  const [detailedEvt, setDetailedEvt] = useState({
    dateEnd: "0000-00-00T00:00:00",
    dateStart: "0000-00-00T00:00:00",
    isFree: false,
  });

  const { state } = useLocation();
  _logger("state", state);
  useEffect(() => {
    if (state?.type === "MY_EVT") setDetailedEvt(state.payload);
  }, [state]);

  return (
    <>
      <div className="container">
        <div className="card-header card m-0 mb-4 bg-light">
          <img
            className="card-img"
            src={detailedEvt.imageUrl}
            style={{
              width: "5",
              height: "23vw",
              objectFit: "cover",
            }}
            alt=""
          />
          <Row className="flex-center">
            <Col>
              <Flex>
                <div className="fs--1 ms-2 flex-1">
                  <h3 className="fs-2 text-capitalize">{detailedEvt.name}</h3>

                  <p className="mb-0 text-capitalize">
                    by{" "}
                    {`${detailedEvt.createdBy?.firstName} ${detailedEvt.createdBy?.lastName} `}{" "}
                  </p>

                  <SubtleBadge pill bg="primary" className="me-2">
                    {detailedEvt.eventType?.name}
                  </SubtleBadge>

                  <SubtleBadge pill className="me-2 text-capitalize">
                    venue: {detailedEvt.venue}
                  </SubtleBadge>

                  <SubtleBadge pill className="mb-0 text-capitalize">
                    {detailedEvt.eventStatus?.name}
                  </SubtleBadge>

                  <p className="mb-0 text-capitalize">
                    Start/End:{" "}
                    {`${detailedEvt.dateStart.slice(
                      0,
                      10
                    )} / ${detailedEvt.dateEnd.slice(0, 10)}`}{" "}
                  </p>
                </div>
              </Flex>
            </Col>
            <Col md="auto" className="mt-4 mt-md-0">
              <Flex>
                <IconButton
                  className="me-2"
                  variant="falcon-default"
                  size="sm"
                  icon="heart"
                  iconClassName="text-danger"
                >
                  434
                </IconButton>
                <IconButton
                  className="me-2"
                  variant="falcon-default"
                  size="sm"
                  icon="share-alt"
                >
                  Share
                </IconButton>
                <IconButton
                  className="me-2"
                  variant="falcon-default"
                  size="sm"
                  icon="null"
                >
                  Register
                </IconButton>
              </Flex>
            </Col>
          </Row>
        </div>
        <div className="card-body  p-sm-6 card p-3 bg-light">
          <h5 className="fs-0 mb-0">Short Description</h5>
          <p
            dangerouslySetInnerHTML={{ __html: detailedEvt.shortDescription }}
          ></p>
          <div>
            <h5 className="fs-0 mb-0">Summary</h5>
            <p dangerouslySetInnerHTML={{ __html: detailedEvt.summary }}></p>
          </div>

          <div>
            <h6 className="mb-0"> Is Free? </h6>
            <SubtleBadge pill className="mb-3 text-capitalize">
              {detailedEvt.isFree.toString()}
            </SubtleBadge>
            <h6 className="fs-0">
              <a href="externalSite">
                External Site: {detailedEvt.externalSiteUrl}
              </a>
            </h6>
          </div>
          <div></div>
        </div>
      </div>
    </>
  );
}

export default DetailedViewEvent;
