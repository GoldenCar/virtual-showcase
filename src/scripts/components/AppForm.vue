<template>
  <div class="content-wrapper">
    <section v-if="visible">
      <div class="container">
        <div class="auth">
          <div class="auth__banner">
            <span
              >Find the <strong>best solution</strong> to building a resilient
              work&nbsp;place.</span
            >
          </div>
          <div class="auth__form">
            <Form
              @submit="onSubmit"
              :validation-schema-="schema"
              v-slot="{ errors }"
            >
              <div class="row">
                <Field
                  name="firstName"
                  placeholder="First Name"
                  type="text"
                  :class="{ 'is-invalid': errors.firstName }"
                />

                <Field
                  name="lastName"
                  placeholder="Last Name"
                  type="text"
                  :class="{ 'is-invalid': errors.lastName }"
                />
              </div>
              <div class="row">
                <Field
                  name="email"
                  placeholder="Email"
                  type="email"
                  :class="{ 'is-invalid': errors.email }"
                />
              </div>
              <div class="row">
                <Field
                  name="companyName"
                  placeholder="Company Name"
                  type="text"
                  :class="{ 'is-invalid': errors.companyName }"
                />
                <Field
                  name="companySize"
                  placeholder="Company Size"
                  type="text"
                  :class="{ 'is-invalid': errors.companySize }"
                />
              </div>
              <div class="row">
                <Field
                  name="jobRole"
                  placeholder="Job Role"
                  type="text"
                  :class="{ 'is-invalid': errors.jobRole }"
                />
              </div>
              <div class="row">
                <Field
                  name="phone"
                  placeholder="Phone"
                  type="text"
                  :class="{ 'is-invalid': errors.phone }"
                />

                <Field
                  name="countryRegion"
                  placeholder="Country Region"
                  type="text"
                  :class="{ 'is-invalid': errors.countryRegion }"
                />
              </div>

              <div class="error-messages">
                <ul>
                  <li v-for="error in errors" :key="`${error}-1`">
                    {{ error }}
                  </li>
                </ul>
              </div>

              <div class="small-text">
                *By clicking on the "Proceed" button, I consent to the
                processing of personal data (wich will not be transfered to
                third parties)
              </div>

              <div class="button_wrapp">
                <button type="submit">Proceed</button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { Form, Field } from "vee-validate";
import * as Yup from "yup";
import bus from '../helpers/bus';
import submit from '../api/form';

export default {

  data: () => ({
    visible: true,
    schema: Yup.object().shape({
      firstName: Yup.string().required("First Name is required"),
      lastName: Yup.string().required("Last name is required"),
      email: Yup.string()
        .required("Email is required")
        .email("Email is invalid"),
      companyName: Yup.string().required("Company Name is required"),
      jobRole: Yup.string().required("Job Role is required"),
      phone: Yup.string().required("Phone is required"),
      countryRegion: Yup.string().required("Country Region is required"),
    }),
  }),

  components: {
    Form,
    Field,
  },

  methods: {
    
    onSubmit (values) {
      this.visible = false;
      bus.emit('reveal-start');
      //submit(values);
    }
  }
};
</script>

<style lang="scss" scoped>
.content-wrapper {
  display: flex;
  height: 100%;

  section {
    width: 100%;
    position: relative;
    box-sizing: border-box;
    display: block;
    backdrop-filter: blur(8px) contrast(80%) brightness(100%);

    .container {
      display: flex;
      justify-content: center;
      align-items: center;
      flex: 0 0 auto;
      position: relative;
      max-width: 40%;
      height: 100%;
      margin: 0 auto;

      .auth {
        display: flex;
        flex-direction: column;
        width: 100%;
        max-width: 968px;
        align-items: center;

        &__banner {
          margin: 0 auto 2rem;
          text-align: center;

          & span {
            color: #000;
            font-size: 35px;
            font-weight: 300;

            @media screen and (min-width: 1200px) {
              font-size: 33px;
            }

            @media screen and (min-width: 1064px) and (max-width: 1200px) {
              font-size: 31px;
            }

            @media screen and (max-width: 1064px) {
              font-size: 28px;
            }

            @media screen and (max-width: 950px) {
              font-size: 25px;
            }
          }
        }

        &__form {
          display: contents;

          & form {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;

            .row {
              margin: 5px auto;
              width: 100%;
              display: flex;

              & input {
                height: 20px;
                width: 100%;
                padding: 10px;
                border: none;
                border-radius: 2px;
                font-family: 'Segoe UI';

                &.is-invalid {
                  border: 1px solid tomato;
                  font-size: 11px;
                }

                &:focus {
                  outline: none;
                }

                &:nth-child(2n) {
                  margin-left: 10px;
                }
              }
            }

            .error-messages {
              & ul li {
                list-style: none;
                color: tomato;
              }
            }

            .small-text {
              font-size: 9px;
              margin-top: 10px;
              color: #000;
              font-weight: 200;

              @media screen and (min-width: 1200px) {
                font-size: 12px;
              }
            }

            .button_wrapp button {
              border: none;
              background: #363231;
              color: #fff;
              font-size: 14px;
              padding: 10px;
              height: 40px;
              width: 130px;
              margin-top: 2rem;
              text-transform: uppercase;
              font-weight: 600;

              &:focus {
                outline: none;
              }
            }
          }
        }
      }
    }
  }
}
</style>
