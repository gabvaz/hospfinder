<template>
  <div class="modal-container">
    <div v-if="modalOpen" class="modalBackdrop" @click="closeModal"></div>
    <transition name="show-modal">
      <div v-if="modalOpen" class="modal">
        <div class="modalContent">
          <span class="closeModal" @click="closeModal"><img src="~/assets/img/close.png"></span>
          <div class="locationInfo">
            <div class="modalHeader">
              <p class="modalTitle">{{ selectedLocation.name }}</p>
              <div class="modalInfo">
                <p>
                  Avaliação média: <span>{{ selectedLocation.rating }}</span>
                </p>
                <div class="favArea">
                  <button
                    class="favBtn unfav"
                    v-if="favorits.includes(selectedLocation.place_id)"
                    @click="
                      removeFav(favorits.indexOf(selectedLocation.place_id))
                    "
                  >
                    Desfavoritar
                  </button>
                  <button
                    v-else
                    @click="handleFav(selectedLocation.place_id)"
                    class="favBtn fav"
                  >
                    Favoritar
                  </button>
                </div>
              </div>
            </div>
            <div class="modalBody">
              <div class="existentsReviews" v-if="modalBodyControl">
                <div class="allReviews">
                  <div v-if="filteredCount <= 0">
                    Nenhuma avaliação :(
                  </div>
                  <div
                    class="singleReview"
                    v-for="review in filteredReviews"
                    :key="keyGen(review.id)"
                  >
                    <p class="reviewTitle">{{ review.title }}</p>
                    <p class="reviewRating">
                      Avaliação: <b>{{ review.rating }}</b>
                    </p>
                    <p class="reviewFull">{{ review.review }}</p>
                  </div>
                </div>
              </div>
              <div class="newReview" v-else>
                <div class="reviewInputs">
                  <div class="singleInput">
                    <label>Título</label>
                    <input
                      v-model="titleReview"
                      type="text"
                      class="inputTitle"
                    />
                  </div>
                  <div class="singleInput">
                    <label>Avaliação*</label>
                    <input
                      v-model="ratingReview"
                      type="number"
                      min="0"
                      max="5"
                      class="inputRating"
                    />
                  </div>
                </div>
                <div class="singleInput">
                  <label>Seu comentário</label>
                  <textarea v-model="singleReview"></textarea>
                </div>

                <button @click="createReview(selectedLocation.place_id)">
                  Enviar Avaliação
                </button>
              </div>
              <button @click="handleComent">{{ modalBodyButton }}</button>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import Vue from "vue";

export default {
  data() {
    return {
      favorits: [],
      reviews: [],
      comentExist: false,
      titleReview: "",
      singleReview: "",
      ratingReview: "",
      modalBodyControl: true,
      modalBodyButton: "Avaliar",
    };
  },
  props: {
    modalOpen: {
      type: Boolean,
      required: true,
    },
    selectedLocation: {
      type: Object,
      required: true,
    },
  },
  methods: {
    handleComent() {
      this.modalBodyControl = !this.modalBodyControl;
      this.modalBodyControl
        ? (this.modalBodyButton = "Avaliar")
        : (this.modalBodyButton = "Voltar");
    },
    removeFav(index) {
      this.favorits.splice(index, 1);
      this.$auth.$storage.setLocalStorage("FAV", JSON.stringify(this.favorits));
      this.$emit("syncFav");
    },
    handleFav(id) {
      if (!this.favorits.includes(id)) {
        this.favorits.push(id);
        this.$auth.$storage.setLocalStorage(
          "FAV",
          JSON.stringify(this.favorits)
        );
      } else {
        alert("já favoritado");
      }
      this.$emit("syncFav");
    },
    createReview(id) {
      if (this.ratingReview >= 0 && this.ratingReview <= 5 && this.ratingReview != '') {
        this.reviews.push({
          id: id,
          title: this.titleReview,
          review: this.singleReview,
          rating: this.ratingReview,
        });
        this.$auth.$storage.setLocalStorage(
          "REVIEWS",
          JSON.stringify(this.reviews)
        );
        this.titleReview = "";
        this.singleReview = "";
        this.ratingReview = "";
        this.modalBodyControl = true;
        this.modalBodyButton = "Avaliar";
      } else {
        Vue.notify({
          group: "error",
          type: "error",
          title: "Verifique os campos",
          text: "A Avaliação deve estar entre 0 e 5",
        });
      }
    },
    closeModal() {
      this.modalBodyControl = true;
      this.modalBodyButton = "Avaliar";
      this.$emit("resetModal");
    },
    checkLocal() {
      if (this.$auth.$storage.getLocalStorage("FAV")) {
        this.favorits = this.$auth.$storage.getLocalStorage("FAV");
      }
      if (this.$auth.$storage.getLocalStorage("REVIEWS")) {
        this.reviews = this.$auth.$storage.getLocalStorage("REVIEWS");
      }
    },
    keyGen(id){
      return Math.random();
    }
  },
  mounted() {
    this.checkLocal();
  },
  computed: {
    filteredReviews() {
      return this.reviews.filter(
        (review) => review.id === this.selectedLocation.place_id
      );
    },
    filteredCount() {
      return this.reviews.filter(
        (review) => review.id === this.selectedLocation.place_id
      ).length;
    },
  },
};
</script>

<style>
.modal-container {
    max-width: 100%;
    max-height: 100%;
    position: absolute;
}
.modal {
  height: auto;
  width: 500px;
  background-color: white;
  z-index: 1000;
  position: fixed;
  box-sizing: border-box;
  padding: 30px;
  left: 0;
  right: 0;
  margin: 0 auto;
  top: 50%;
  transform: translateY(-50%);
  border-radius: 0.5rem;
  box-shadow: 0 0 1.8rem rgba(0, 0, 0, 0.15);
}
.modalContent {
  position: relative;
  height: 100%;
  width: 100%;
}
.closeModal {
  position: absolute;
  right: -15px;
  top: -15px;
  cursor: pointer;
}
.modalBackdrop {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 1000;
  position: fixed;
  top: 0;
  left: 0;
}
.show-modal-enter-active,
.show-modal-leave-active {
  transition: all 0.3s ease-out;
}
.show-modal-enter,
.show-modal-leave-to {
  transform: translateY(100%);
}
.modalPlace {
  font-size: 14px;
  font-weight: 400;
}
.modalInfo,
.modalLocation {
  margin-bottom: 0.5rem;
}
.modalTitle {
  font-weight: 700;
  font-size: 18px;
  margin-bottom: 1rem;
}
.locationInfo span {
  font-weight: bold;
}
.newReview {
  display: flex;
  flex-direction: column;
}
.modalBody button {
  border: 1px solid var(--primary);
  color: var(--primary);
  padding: 0.5rem 1rem 0.5625rem;
  border-radius: 4px;
  margin: 1rem 0;
  font-weight: 500;
  cursor: pointer;
  max-width: 150px;
  background: transparent;
}
.modalBody button:hover {
  background: var(--colorHover);
  border-color: var(--colorHover);
  color: white;
}
.newReview input,
.newReview textarea {
  margin: 0.25rem 0rem;
}
textarea {
  height: 100px;
}
.allReviews {
  margin: 1rem 0;
  max-height: 200px;
  overflow-y: scroll;
}
.singleReview {
  padding: 1rem;
  background: #11221122;
}
.singleReview:nth-child(odd) {
  background: #11221133;
}
.modalInfo {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.favBtn {
  border-radius: 4px;
  border: 1px solid #bfbf56;
  background: transparent;
  color: #bfbf56;
  font-weight: bold;
  padding: 0.5rem 1rem;
  cursor: pointer;
}
button.favBtn.unfav {
  color: white;
  background: #bfbf56;
}
.modal textarea,
.modal input {
  border: 1px solid gray;
  border-radius: 5px;
  padding: 0.5rem;
}
.singleInput:first-child {
  width: 70%;
}
.singleInput {
  display: flex;
  flex-direction: column;
}
.reviewTitle {
  font-weight: bold;
  font-size: 18px;
  margin-bottom: 0.5rem;
}
.reviewRating {
  margin-bottom: 0.5rem;
}
.reviewInputs {
  display: flex;
  justify-content: space-between;
}
.closeModal img {
    max-width: 15px;
}
@media (max-width: 767px) {
  .modal {
    max-width: 90%;
  }
  .modalInfo {
    flex-direction: column;
    align-items: self-start;
  }
  .favArea {
    margin-top: 1rem;
  }
  .reviewInputs {
    flex-direction: row;
  }
  .reviewInputs .singleInput:nth-child(2) {
    max-width: 100px;
  }
  .reviewInputs .singleInput:first-child {
    width: 60%;
}
  .modalBody {
    margin-top: 2rem;
  }
}
</style>