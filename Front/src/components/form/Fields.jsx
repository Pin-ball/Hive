import { ErrorContext } from "@src/components/form/Edition";
import { Form, Input, Tag, TagGroup}  from "rsuite";
import { forwardRef, useContext } from "react";

export const Field = (props) => {
  const { customErrors } = useContext(ErrorContext);
  const { name, label, accepter, ...rest } = props;

  const CustomErrors = () => {
    if (!(name in customErrors)) return;

    return (
      <TagGroup className='!mt-0.5'>
        { customErrors[name].map((error, i) => <Tag color="red" key={i} size="md">{error}</Tag>) }
      </TagGroup>
    )
  }

  return (
    <Form.Group controlId={name}>
      <Form.ControlLabel>{label}</Form.ControlLabel>
      <Form.Control name={name} accepter={accepter} {...rest} />
      <CustomErrors/>
    </Form.Group>
  );
}


export const Textarea = forwardRef((props, ref) => {
  return <Input {...props} as="textarea" className='min-h-24 max-h-80' ref={ref} />
});
