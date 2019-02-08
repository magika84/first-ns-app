<template>
    <Page>
        <ActionBar title="Plane Action list" class="action-bar"/>


  <ScrollView orientation="vertical">
      <StackLayout height="100%">
        <StackLayout width="95%" marginTop="15" borderRadius="5" paddingTop="5">

                <ListView class="list-group" for="item in planeActions" style="height:75%" @itemTap="onPlaneActionTap">
                  <v-template>
                    <Label :text="item.line" textWrap="true" class="list-group-item-heading h3"/>
                  </v-template>
                </ListView>
        </StackLayout>
      </StackLayout>
  </ScrollView>

    </Page>
</template>

<script>
export default {

  data() {
     return {  
    planeActions: [
        {
          line: "downwind"
        },
        {
          line: "base"
        },
        {
          line: "final"
        }
      ],   
    }
  },
  methods: {
    
    onPlaneActionTap(args) {

       // alert(args.index + " " + args.item.faaID + " " +  args.item.airportName);
       this.$modal.close(args.item);

    }
  }

};
</script>