/* Copyright (c) 2015, Oracle and/or its affiliates. All rights reserved. */

/******************************************************************************
 *
 * You may not use the identified files except in compliance with the Apache
 * License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0.
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * NAME
 *   1-run-as-sys.sql
 *
 * DESCRIPTION
 *   This file sets up the grants and privileges necessary for the HR schema
 *   to perform CQN registrations. The network ACL allows HR to connect to
 *   anywhere. For a less privileged ACL see the following sample code from
 *   the Oracle Application Express documentation:
 *   https://docs.oracle.com/cd/E37097_01/install.42/e35123/otn_install.htm#HTMIG400
 *
 * RUN ON ADMIN
 *****************************************************************************/

GRANT EXECUTE ON UTL_HTTP to <USR_NAME>;
GRANT EXECUTE ON DBMS_CQ_NOTIFICATION TO <USR_NAME>; 
GRANT CHANGE NOTIFICATION TO <USR_NAME>;

ALTER SYSTEM SET "JOB_QUEUE_PROCESSES"=4;


DECLARE

    acl_path VARCHAR2(4000);
  
BEGIN

    SELECT acl 
    INTO acl_path 
    FROM dba_network_acls
    WHERE host = '*' 
        AND lower_port IS NULL 
        AND upper_port IS NULL;
    
    IF dbms_network_acl_admin.check_privilege(acl_path, '<USR_NAME>', 'connect') IS NULL 
    THEN
        dbms_network_acl_admin.add_privilege(acl_path, '<USR_NAME>', TRUE, 'connect');
    END IF;
 
EXCEPTION

    WHEN NO_DATA_FOUND 
    THEN
        dbms_network_acl_admin.create_acl(
            'power_users.xml',
            'ACL that lets power users to connect to everywhere',
            '<USR_NAME>', 
            TRUE, 
            'connect'
        );
        
        dbms_network_acl_admin.assign_acl('power_users.xml','*');
  
END;
/

COMMIT;