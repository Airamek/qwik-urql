import { $, component$, useStyles$, useResource$, Resource, useStore } from '@builder.io/qwik';
import style from './formstyle.css?inline';
import { gql } from '@urql/core';
import { useMutation } from '~/hooks/use-mutation.ts';
import { useSubscription } from '~/hooks/use-subscription.ts';
import { useQuery } from '~/hooks/use-query';

export const ADD_USER = gql`
mutation MyMutation($name: String!, $email: String!, $tel : String!) {
    insert_testdata(objects: {Name: $name, Email: $email, Tel: $tel}) {
      returning {
        id
      }
    }
  }
`;

export const AddUserMutation = $(() => ADD_USER)

export const Dataform = component$(() => {
    useStyles$(style);
    const initialVars = useStore({})
    const { data, errors, loading, mutate$ } = useMutation(AddUserMutation, initialVars);
    return (
        <div>
            <form id="dataform">
                <label for="Name">Name</label>
                <input type="text" name="name"></input>
                <label for="mail">E-mail</label>
                <input type="email" name="mail"/>
                <label for="tel">Tel</label>
                <input type="text" name="tel"/>
                <input type="submit" value="nyomjad" preventdefault:click 
                // This will prevent the default behavior of the "click" event.
                onClick$={(event) => {
                    const usrFrom = new FormData(document.querySelector("#dataform"));
                    console.log("happens");
                    mutate$({
                        name: usrFrom.get("name"),
                        email: usrFrom.get("mail"),
                        tel: usrFrom.get("tel")
                    });
                }}></input>
            </form>
        </div>
    );
});

export const GET_USERS = gql`
subscription getUsers {
    testdata {
        id
        Email
        Name
        Tel
    }
}`;

export const GetUserSub = $(() => GET_USERS)

export default component$(() => {
    const items = useSubscription(GetUserSub);
    // const items = useResource$(() => {
    //     return Promise(() => undefined);
    // });
    return (
        <>
            <div class="form-cont">
                <Dataform />
            </div>
            <hr />
            <div class="users-cont">
                <Resource value={items}
                    onPending={() => (<div>Loading Item</div>)}
                    onResolved={(recived: any) => (
                    <table class="users">
                        <tbody>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>E-mail</th>
                                <th>Phone</th>
                            </tr>
                            {
                            recived.data.testdata.sort((a, b) => (a.id > b.id) ? 1 : -1).map((user) => {
                                return (
                                <tr>
                                    <td>{user.id}</td>
                                    <td>{user.Name}</td>
                                    <td>{user.Email}</td>
                                    <td>{user.Tel}</td>
                                </tr>
                                )
                            })}
                        </tbody>
                    </table>
                    )}
                    onRejected={(error) => (<div>Error fetching item: {JSON.stringify(error)}</div>)}
                /> 
                
            </div>
        </>
    );
});