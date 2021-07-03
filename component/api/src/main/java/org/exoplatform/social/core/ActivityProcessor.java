/*
 * Copyright (C) 2003-2010 eXo Platform SAS.
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License
 * as published by the Free Software Foundation; either version 3
 * of the License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, see<http://www.gnu.org/licenses/>.
 */
package org.exoplatform.social.core;

import org.exoplatform.container.component.ComponentPlugin;
import org.exoplatform.social.core.activity.model.ExoSocialActivity;


/**
 * An activity processor is responsible to pre-process an activity
 * before it is returned by the {@link org.exoplatform.social.core.manager.ActivityManager}
 */
public interface ActivityProcessor extends ComponentPlugin {
  void processActivity(ExoSocialActivity activity);
  int getPriority();

  /**
   * @return true if the Activity Processor is to use before saving activity,
   *         else false
   */
  default boolean isPreActivityProcessor() {
    return false;
  }
}
