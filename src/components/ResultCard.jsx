import { Badge, Card, Progress, Table } from "antd";
import React from "react";
import "./resultcard.scss";

const ResultCard = (props) => {
  const { id, num, title, choices, type, answers, img_count } = props;
  const badge_color = type === "objective" ? "pink" : type === "subjective" ? "yellow" : "blue";

  const columns = [
    {
      title: "Answer",
      dataIndex: "answer",
    },
  ];

  const addOption = (type) => {
    // 객관식
    if (type === "objective") {
      const dict = {};
      const sum = answers.length;
      for (const key of choices) {
        dict[key] = 0;
      }
      for (const ans of answers) {
        dict[ans.answer] += 1;
      }
      return choices.map((obj, idx) => (
        <div className="objective-card" key={idx}>
          <div className="objective-choice">{obj}</div>
          <Progress percent={Math.round((dict[obj] / sum) * 100)} status="active" />
        </div>
      ));
    }
    // 객관식 (사진)
    else if (type === "img_objective") {
      let dict = {};
      const sum = answers.length;
      for (let i = 0; i < img_count; i++) {
        dict[i] = 0;
      }
      for (const ans of answers) {
        dict[ans.answer] += 1;
      }
      return Array.from({ length: img_count }, () => "").map((obj, idx) => (
        <div className="img-objective-card" key={idx}>
          <div className="img-objective">
            <img src={`/api/image/get_objective_img?question_id=${id}&image_index=${idx}`} alt="" />
          </div>
          <Progress percent={Math.round((dict[idx] / sum) * 100)} status="active" />
        </div>
      ));
    }
    // 주관식
    else if (type === "subjective") {
      const data = [];
      for (let ans of answers) {
        data.push({ key: `${ans.id}`, answer: `${ans.answer}` });
      }
      return (
        <div className="subjective-card">
          <Table className="subjective-table" columns={columns} dataSource={data} scroll={{ y: 240 }} />
        </div>
      );
    }
  };

  return (
    <div className="resultcard-wrapper">
      <Badge.Ribbon
        text={type === "objective" ? "객관식" : type === "subjective" ? "주관식" : "객관식(사진)"}
        color={badge_color}
      >
        <Card title={<div className="resultcard-title">{`${num}. ${title}`}</div>} size="small">
          <div style={{ margin: "10px 0px" }}>
            총 <span style={{ color: "blue", fontWeight: "bolder" }}>{answers.length}개</span>의 응답
          </div>
          {addOption(type)}
        </Card>
      </Badge.Ribbon>
    </div>
  );
};

export default ResultCard;
