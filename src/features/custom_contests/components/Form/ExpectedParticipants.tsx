import React from "react";
import Stack from "@mui/material/Stack";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import {
  Control,
  Controller,
  FieldErrors,
  useFieldArray,
} from "react-hook-form";
import { FormControl } from "@features/ui/component/FormControl";
import { ErrorMessage } from "@features/ui/component/ErrorMessage";
import { CreateCustomContest } from "@features/custom_contests/customContest";
import { Checkbox } from "@features/ui/component/Checkbox";
import { Input } from "@features/ui/component/Input";
import { Button } from "@features/ui/component/Button";

type Props = {
  control: Control<CreateCustomContest>;
  errors: FieldErrors<CreateCustomContest>;
  excludeSolved: boolean;
};

export const ExpectedParticipants: React.FC<Props> = ({
  control,
  errors,
  excludeSolved,
}) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "problemsFilter.expectedParticipants",
  });

  return (
    <>
      <Controller
        control={control}
        name="problemsFilter.excludeSolved"
        render={({ field }) => (
          <>
            <Checkbox
              title="Restriction"
              label="Don't suggest problems solved by expected participants"
              toggle={() => {
                field.onChange(!field.value);
              }}
              description="When you check this, problems solved by expected participants are excluded"
            />
          </>
        )}
      />
      {excludeSolved && (
        <>
          <span>
            <label
              htmlFor="title-input"
              css={{ fontWeight: "bold", paddingBottom: "0.3rem" }}
            >
              Expected Participants
            </label>
            <Button onClick={() => append({ name: "" })} sx={{ ml: 1 }}>
              <AddIcon />
            </Button>
          </span>
          {fields.map((field, index) => (
            <Stack key={field.id} direction="row" gap={1} my={0.5}>
              <Controller
                name={`problemsFilter.expectedParticipants.${index}.name`}
                control={control}
                render={({ field }) => (
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="User ID"
                      id="user-name-input"
                      type="text"
                    />
                    <ErrorMessage
                      message={
                        errors.problemsFilter?.expectedParticipants?.message
                      }
                    />
                  </FormControl>
                )}
              />
              <Button onClick={() => remove(index)}>
                <RemoveIcon />
              </Button>
            </Stack>
          ))}
        </>
      )}
    </>
  );
};

// import {
//   useFieldArray,
//   Controller,
//   Control,
//   FieldErrorsImpl,
//   DeepRequired,
// } from "react-hook-form";
// import { ErrorMessage } from "@hookform/error-message";
// import { Button, Input, Row, Col, FormGroup, Label, Badge } from "reactstrap";
// import { EventContent } from "../../types/index";
// import { Tooltip } from "../Elements/Tooltip";

// interface Props {
//   control: Control<EventContent, any>;
//   errors: FieldErrorsImpl<DeepRequired<EventContent>>;
// }

// export const MemberForm = (props: Props) => {
//   const { control, errors } = props;
//   const { fields, append, remove } = useFieldArray({
//     control,
//     name: "members",
//   });

//   const onClickAddMember = () => {
//     append({ name: "", ratio: 1 })
//   };

//   const onClickRemoveMember = (index: number) => {
//     remove(index);
//   };

//   return (
//     <>
//       <FormGroup>
//         <Col sm={12}>
//           <Row>
//             <Col xs="7">
//               <Label for="members">
//                 メンバー名*{" "}
//                 <span>
//                   <Button onClick={onClickAddMember} color="primary">
//                     ＋
//                   </Button>
//                 </span>
//               </Label>
//             </Col>
//             <Col xs="5">
//               <Label for="members">
//                 傾斜配分{" "}
//                 <Badge color="primary" pill={true} id="tooltip-explanation">
//                   ?
//                 </Badge>
//                 <Tooltip
//                   target="tooltip-explanation"
//                   children={
//                     <>
//                       <div>傾斜配分とは…</div>
//                       <div>割り当てる金額の割合(比率)を指定します。</div>
//                       <div>Aさん「1」, Bさん「2」</div>
//                       <div>Aさん:Bさん=1:2</div>
//                     </>
//                   }
//                 />
//               </Label>
//             </Col>
//           </Row>
//         </Col>
//         <Col sm={12}>
//           {fields.map((field, index) => (
//             <li key={field.id} className="event-form__user-form">
//               <Row>
//                 <Col xs="7">
//                   <Controller
//                     control={control}
//                     name={`members.${index}.name`}
//                     render={({ field }) => (
//                       <Input
//                         {...field}
//                         placeholder={`ユーザー名`}
//                         type="text"
//                         invalid={!!errors.members?.[index] || !!errors.members}
//                       />
//                     )}
//                   />
//                   <div style={{ color: "red", fontSize: "0.9rem" }}>
//                     <ErrorMessage
//                       errors={errors}
//                       name={`members.${index}.name`}
//                     />
//                   </div>
//                 </Col>

//                 <Col xs="3">
//                   <Controller
//                     control={control}
//                     name={`members.${index}.ratio`}
//                     render={({ field }) => (
//                       <Input
//                         {...field}
//                         placeholder="傾斜配分"
//                         type="number"
//                         invalid={!!errors.members?.[index]}
//                       />
//                     )}
//                   />
//                   <div style={{ color: "red", fontSize: "0.9rem" }}>
//                     <ErrorMessage
//                       errors={errors}
//                       name={`members.${index}.ratio`}
//                     />
//                   </div>
//                 </Col>
//                 <Col xs="1">
//                   <Button
//                     onClick={() => onClickRemoveMember(index)}
//                     color="secondary"
//                   >
//                     ー
//                   </Button>
//                 </Col>
//               </Row>
//             </li>
//           ))}
//           <div style={{ color: "red", fontSize: "0.9rem" }}>
//             <ErrorMessage
//               errors={errors}
//               name="members"
//               render={({ messages }) =>
//                 messages &&
//                 Object.entries(messages).map(([type, message]) => (
//                   <p key={type}>{message}</p>
//                 ))
//               }
//             />
//           </div>
//         </Col>
//       </FormGroup>
//     </>
//   );
// };
