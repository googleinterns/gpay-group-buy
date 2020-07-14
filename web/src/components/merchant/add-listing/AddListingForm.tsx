/**
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React from 'react';

import Form from 'components/common/Form';
import useAddListingForm from 'components/merchant/add-listing/hooks/useAddListingForm';

const AddListingForm: React.FC = () => (
  <Form
    buttonText="Add Listing"
    fields={[
      {label: 'Product Name', name: 'name', type: 'text'},
      {label: 'Discounted Price', name: 'price', type: 'number'},
      {label: 'Original Price', name: 'oldPrice', type: 'number'},
      {label: 'Deadline', name: 'deadline', type: 'date'},
      {label: 'Min. Buyers', name: 'minCommits', type: 'number'},
      {label: 'Description', name: 'description', type: 'text'},
      {label: 'Image URL', name: 'imgUrl', type: 'url'},
    ]}
    {...useAddListingForm()}
  />
);

export default AddListingForm;
