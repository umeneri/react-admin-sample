import * as React from 'react';
import {
  Create,
  SimpleForm,
  TextInput,
  Button,
  TopToolbar,
} from "react-admin";
import { postToTextlint, registerReceiver } from './register';


const PostCreateActions = () => {
  console.log('hoge');
  
  const [lintResults, setLintResults] = React.useState([] as string[]);
  const [body, setBody] = React.useState("");

  React.useEffect(() => {
    registerReceiver(setLintResults);
    postToTextlint(body);
    console.log(body);
  }, [body, setLintResults]);

  const customAction = async () => {
    setBody(`
お刺身を食べれない。
人が出れないんです
この距離からでも見れる。
今日は来れる？
人が来れないんです

つくってみる
    `);
  };

  return (
    <div>
      {/* Add your custom actions */}
      <Button color="primary" onClick={customAction}>
        <div>{ "Custom Action" }</div>
      </Button>
      <div>{lintResults.map((e) => e.toString())}</div>
    </div>
  );
};

export const PostCreate = () => (
  <Create actions={<PostCreateActions />}>
    <SimpleForm>
      {/* <ReferenceInput source="userId" reference="users" /> */}
      <TextInput source="title" />
      <TextInput source="body" multiline rows={5} />
    </SimpleForm>
  </Create>
);
