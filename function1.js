$(document).ready(function () {
  $.get("https://5d76bf96515d1a0014085cf9.mockapi.io/quiz", function (g) {
    for (var v = 0; v < g.length; v++) {
      var questions = $("<h2>").html("Q" + g[v].id + " " + g[v].question);
      $("#question").append(questions);
      for (var j = 0; j < g[v].options.length; j++) {
        var options = $("<div>").addClass("label");
        var label = $("<label>").attr("id", g[v].id);
        var labeL = $("<input>")
          .attr("type", "radio")
          .attr("name", "option" + g[v].id)
          .attr("value", j + 1)
          .attr("class", "option" + g[v].id)
          .addClass("radio-btn");
        var span = $("<span>").html(g[v].options[j]);
        label.append(labeL, span);
        options.append(label);
        $("#question").append(options);
      }
      $("#question").append($("<div>").addClass("hr"));
    }
    $("#submit").click(function (e) {
      e.preventDefault();
      var selected = [];
      var answers = [];
      for (var v = 0; v < g.length; v++) {
        var names = "option" + g[v].id;
        selected.push($("input[name= " + names + "]:checked").val());
        answers.push(g[v].answer);
        if ($("input[name= " + names + "]:checked").val() == g[v].answer) {
          $("input[name= " + names + "]:checked")
            .parent()
            .append("<span><i class='fas fa-check'></i></span>");
        } else {
          $("input[name= " + names + "]:checked")
            .parent()
            .append("<span><i class='fas fa-times'></i></span>");
          $("input[name= " + names + "]")[g[v].answer - 1].parentNode.append(
            $("<i>").addClass("fas fa-check")[0]
          );
        }
      }

      var count = 0;
      for (var n = 0; n < selected.length; n++) {
        for (var n = 0; n < answers.length; n++) {
          if (selected[n] == answers[n]) {
            count++;
          }
        }
      }
      $("#totalMarks").html(count + "/5");
    });
  });
});
