/*
 * Copyright © 2015-2016 Cask Data, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */

package io.cdap.cdap.cli.command.security;

import com.google.common.base.Joiner;
import com.google.common.base.Preconditions;
import com.google.inject.Inject;
import io.cdap.cdap.cli.ArgumentName;
import io.cdap.cdap.cli.CLIConfig;
import io.cdap.cdap.cli.util.AbstractAuthCommand;
import io.cdap.cdap.client.AuthorizationClient;
import io.cdap.cdap.proto.security.Action;
import io.cdap.cdap.proto.security.Authorizable;
import io.cdap.cdap.proto.security.Principal;
import io.cdap.common.cli.Arguments;

import java.io.PrintStream;
import java.util.Set;

/**
 * Revoke command base class
 */
public abstract class RevokeActionCommand extends AbstractAuthCommand {

  private final AuthorizationClient client;

  @Inject
  RevokeActionCommand(AuthorizationClient client, CLIConfig cliConfig) {
    super(cliConfig);
    this.client = client;
  }

  @Override
  public void perform(Arguments arguments, PrintStream output) throws Exception {
    Authorizable authorizable = Authorizable.fromString(arguments.get(ArgumentName.ENTITY.toString()));
    String principalName = arguments.getOptional("principal-name", null);
    String type = arguments.getOptional("principal-type", null);
    Principal.PrincipalType principalType =
      type != null ? Principal.PrincipalType.valueOf(type.toUpperCase()) : null;
    Principal principal = type != null ? new Principal(principalName, principalType) : null;
    String actionsString = arguments.getOptional("actions", null);
    Set<Action> actions = actionsString == null ? null : ACTIONS_STRING_TO_SET.apply(actionsString);

    client.revoke(authorizable, principal, actions);
    if (principal == null && actions == null) {
      // Revoked all actions for all principals on the entity
      output.printf("Successfully revoked all actions on entity '%s' for all principals", authorizable.toString());
    } else {
      // currently, the CLI only supports 2 scenarios:
      // 1. both actions and principal are null - supported in the if block.
      // 2. both actions and principal are non-null - supported here. So it should be ok to have preconditions here to
      // enforce that both are non-null. In fact, if only one of them is null, the CLI will fail to parse the command.
      Preconditions.checkNotNull(actions, "Actions cannot be null when principal is not null in the revoke command");
      Preconditions.checkNotNull(principal, "Principal cannot be null when actions is not null in the revoke command");
      output.printf("Successfully revoked action(s) '%s' on entity '%s' for %s '%s'\n",
                    Joiner.on(",").join(actions), authorizable.toString(), principal.getType(), principal.getName());
    }
  }
}
