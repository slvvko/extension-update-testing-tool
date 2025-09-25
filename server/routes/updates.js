// Copyright 2023 Google LLC

// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at

//     https://www.apache.org/licenses/LICENSE-2.0

// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

const state = require("../state");

/**
 * Artificial delay to simulate network/server delays that can affect onUpdateAvailable timing.
 */
const UPDATE_CHECK_DELAY_MS = 30 * 1000;

module.exports = (req, res) => {
  console.log(`[Update Check] Artificial delay: ${UPDATE_CHECK_DELAY_MS} ms`);

  // Add artificial delay to simulate real-world scenarios where there might be
  // delays between Chrome's update check and when onUpdateAvailable fires
  setTimeout(() => {
    res.setHeader("Content-Type", "application/xml");

    const { id, version } = state.getExtension();

    console.log(`[Update Check] Responding with version ${version} for extension ${id}`);

    res.send(`
<?xml version='1.0' encoding='UTF-8'?>
<gupdate xmlns='http://www.google.com/update2/response' protocol='2.0'>
  <app appid='${id}'>
    <updatecheck codebase='http://${req.hostname}:${state.PORT}/extension.crx' version='${version}' />
  </app>
</gupdate>
    `.trim());
  }, UPDATE_CHECK_DELAY_MS);
};
