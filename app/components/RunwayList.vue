<template>
    <Page @loaded="loadRunway">
        <ActionBar title="Runway List" class="action-bar"/>

                <ListView for="runway in this.runways" class="list-group"  @itemTap="onRunwayHeadingTap">
                  <v-template>
                    <GridLayout columns="auto,*" rows="*, *" paddingLeft="10" paddingTop="5" paddingBottom="5" paddingRight="5">
                      <StackLayout width="95%" marginTop="15" borderRadius="5" paddingTop="5"  class="list-group-item">
                        <Label v-bind:text="runway.rnwyfaaID + ' ' + runway.runway" class="list-group-item-heading"/>
                      </StackLayout>
                    </GridLayout>
                  </v-template>
                </ListView>

    </Page>
</template>

<script>
export default {
  data() {
     return {
        faaID: "",
        rwyHeading: "",
        runways: [],
        shortRnwyList: []
    }
  },
  methods: {
    loadRunway() {
      
      this.$store.dispatch("queryRunway").then(() => {
        this.runways = this.$store.getters.allRunway;
       
        
        //trimHeadingList();
      });
      for(var i = 0; i < this.runways.length; i++ ){
        console.log("this.runways.rnwyfaaID[" + i + "]: " + this.runways.rnwyfaaID[i]);
      }
    },
    trimHeadingList(){
      console.log("Inside matchAirport: SelectedAirport is :" + this.SelectedAirport.faaID);
      for(var i = 0; i < this.runways.length; i++ ){
        if(this.SelectedAirport.faaID == this.runways[i]){
            this.shortRnwyList = this.runways;
            console.log("Shorter version of Runway List: " + this.shortRnwyList[i][0] + " " + this.shortRnwyList[i][1]);
        }
      }    

    },
    
    onRunwayHeadingTap(args) {

       this.$modal.close(args.item);

    }

  }
};
</script>