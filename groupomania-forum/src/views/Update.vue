<template>
  <div id="updatePost">
  <h1>Réseau Social <br> GROUPOMANIA</h1>
   
    <div>
      <h2>Modifier votre post...</h2>

      <form class="px-4 py-3 Post" id="formpost" encType="multipart/form-data">

       <div class="block-cmt-input">
        <div class="form-row">
          <label for="title"></label>
          <input
            type="text"
            class="form-row__input textarea"
            v-model="title"
            id="title"
            placeholder="votre titre"
            aria-required="true"
            required
          />
          <span class="error" v-if="!$v.title.required && $v.title.$dirty"
            >Veuillez ajouter un titre
          </span>
        </div>

        <div class="form-row">
          <label for="content"></label>
          <textarea
            class="form-row__input textarea"
            rows="3"
            id="content"
            placeholder="Modifier votre text...ou votre image"
            aria-required="true"
          ></textarea>
        </div>

        <div class="form-row">  <!-- Iincludes the type of files that can be uploaded-->
          <label for="image" class="sr-only" title="image" role="button"></label>
          <input
            type="file"
            accept=".png, .jpg, .jpeg, .gif, .webp"  
            v-on:change="onSelect"
            aria-required="true"
            ref="file"
            id="image"/>
        </div> 

        <div class="btn-motif-delete">
          <button
              type="submit"
              class="btn-modif"
              @click="updateForm()">
              Modifier
          </button>
            
          <button 
              type="submit" 
              class="btn-delete ml-5"
              @click="deleteForm()">
              Supprimer
          </button>
        </div>
       </div>
      </form>

    </div>
  </div>
</template>
<script>
import axios from "axios";
import { required } from "vuelidate/lib/validators";
import VueJwtDecode from "vue-jwt-decode";

export default {
  name: "Update",

  data() {
    return {
      title: "",
      file: "",
    };
  },
  validations: {
    title: {
      required,
    },
  },
  methods: {
    onSelect() {
      this.file = this.$refs.file.files[0];
    },

    updateForm() {
      this.submited = true;
      this.$v.$touch();
      if (!this.$v.$invalid) {
        const token = localStorage.getItem("token");
        const userId = VueJwtDecode.decode(localStorage.getItem("token")).userId;
        const title = document.querySelector("#title").value;
        const content = document.querySelector("#content").value;
        const idPost = this.$route.params.id;
        
        if (token) {
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        } else {
          axios.defaults.headers.common["Authorization"] = null;
          this.$router.push("/");
        }
        const formData = new FormData();
        formData.append("image", this.file);
        formData.append("title", title);
        formData.append("content", content);
        formData.append("user_id", userId);
        axios
          .post(this.$localhost + "api/post/update/" + idPost, formData, {
            headers: {
              Authorization: "bearer " + token,
            },
          })
          .then((res) => {
            if (res) {
              this.$router.push("/");
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },

    deleteForm() {
      const token = localStorage.getItem("token");
      const idPost = this.$route.params.id;
      axios
        .delete(this.$localhost + "api/post/delete/" + idPost, {
          headers: {
            Authorization: "bearer " + token,
          },
        })
        .then((res) => {
          if (res) {
            this.$router.push("../");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped>

#updatePost {
  margin-top: 70px;
  text-align: center;
  width: 100%;
}

h1 {
  margin-bottom: 50px;
}

h2 {
  padding: 0px;
  font-size: 18px;
  margin-bottom: 0px;
}

.Post {
  margin-top: 0px;
  margin-bottom: 0px;
  width: 100%;
}

.block-cmt-input {
  width: 100%;
}

.form-row {
  display: flex;
  margin: 16px 0px;
  gap: 16px;
  flex-wrap: wrap;
}

.form-row__input {
  padding: 8px;
  border: none;
  border-radius: 8px;
  background: #ffffff;
  font-weight: 500;
  font-size: 16px;
  flex: 1;
  color: black;
  border: 1px solid black;
  width: 100%;
}

.form-row__input::placeholder {
  color: #aaaaaa;
}

.button {
  background: #cacbcd;
}

.btn-modif, .btn-delete {
  background: #d6d7d8;
  padding: 8px 10px;
  border-radius: 5px 5px; 
  display: block;
  margin-left: auto;
  margin-right: auto 
}

.btn-motif-delete {
  display: flex;
  flex-direction: row;
  margin-top: 70px;
}

.btn-delete {
  color: #af4444;
}

@media (min-width: 320px){
  .block-cmt-input {
  width: 100%;
}

  .textarea {
    width: 100%;
  }
}

</style>
