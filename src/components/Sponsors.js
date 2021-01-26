/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {
  Edit,
  Show,
  List,
  Datagrid,
  TextField,
  Create,
  SimpleShowLayout,
  TextInput,
  ImageInput,
  ImageField,
  SimpleForm,
  FunctionField,
} from 'react-admin';
import {
  OnShowToolbar,
  OnListToolbar,
  CustomPagination,
} from '../services/Helpers';

const PostTitle = ({ record }) => {
  return <span>{record ? `Fiche du partenaire ${record.name} ` : ''}</span>;
};

export const sponsorsList = (props) => {
  return (
    <div>
      <List
        {...props}
        title="Sponsors"
        actions={<OnListToolbar create />}
        pagination={<CustomPagination />}
      >
        <Datagrid rowClick="show">
          <TextField source="name" label="Nom du partenaire" />
          <FunctionField
            label="Lien vers l'image"
            render={(record) => {
              return (
                typeof record.image === 'string' && (
                  <a
                    href={`${process.env.REACT_APP_API_BASE_URL}/${record.image}`}
                  >
                    {record.image}
                  </a>
                )
              );
            }}
          />
        </Datagrid>
      </List>
    </div>
  );
};

export const createSponsor = (props) => {
  return (
    <div>
      <Create {...props} title="Créer un sponsor">
        <SimpleForm>
          <TextInput source="name" label="Nom du partenaire" />
          <ImageInput
            source="image"
            label="Aperçu de l'image"
            accept="image/*"
            placeholder={
              <p>
                Vous pouvez glisser/déposer un fichier ici ou cliquer pour
                parcourir
              </p>
            }
          >
            <ImageField source="src" title="title" />
          </ImageInput>
        </SimpleForm>
      </Create>
    </div>
  );
};

export const editSponsor = (props) => {
  return (
    <div>
      <Edit {...props} title="Créer un sponsor">
        <SimpleForm>
          <TextInput source="name" label="Nom du partenaire" />
          <FunctionField
            label="Aperçu de l'image actuelle'"
            render={(record) => {
              return (
                <img
                  alt={record.name}
                  src={`${process.env.REACT_APP_API_BASE_URL}/${record.image}`}
                />
              );
            }}
          />
          <ImageInput
            source="image"
            label="Changer d'image"
            accept="image/*"
            placeholder={
              <p>
                Vous pouvez glisser/déposer un fichier ici ou cliquer pour
                parcourir
              </p>
            }
          >
            <ImageField source="src" title="title" />
          </ImageInput>
        </SimpleForm>
      </Edit>
    </div>
  );
};

export const showSponsors = (props) => {
  return (
    <Show title={<PostTitle />} {...props} actions={<OnShowToolbar edit />}>
      <SimpleShowLayout>
        <TextField source="name" label="Nom du partenaire" />
        <FunctionField
          label="Aperçu de l'image"
          render={(record) => {
            return (
              <img
                alt={`${process.env.REACT_APP_API_BASE_URL}/${record.image}`}
                src={`${process.env.REACT_APP_API_BASE_URL}/${record.image}`}
              />
            );
          }}
        />
      </SimpleShowLayout>
    </Show>
  );
};
